<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);

if (session_status() === PHP_SESSION_NONE) {
    $isSecure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == 443);
    session_set_cookie_params([
        'lifetime' => 0,
        'path'     => '/',
        'domain'   => '',
        'secure'   => $isSecure,
        'httponly' => true,
        'samesite' => 'Lax'
    ]);
    session_start();
}

if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

ob_start();

require_once __DIR__ . '/base-path.php';
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/config/connection.php';

$database = new Database();
$conn = $database->getConnection();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/PHPMailer/src/Exception.php';
require_once __DIR__ . '/PHPMailer/src/PHPMailer.php';
require_once __DIR__ . '/PHPMailer/src/SMTP.php';

// ==========================================
// SECURITY HELPERS & CONFIGURATION
// ==========================================

function getAuthSecret()
{
    $secret = getenv('AUTH_PEPPER') ?: (defined('AUTH_PEPPER') ? AUTH_PEPPER : null);
    if (empty($secret)) {
        throw new RuntimeException('AUTH_PEPPER is not configured. Authentication cannot proceed safely.');
    }
    return $secret;
}

function hashOTP($email, $otp)
{
    $secret = getAuthSecret();
    $normalizedEmail = strtolower(trim($email));
    return hash_hmac('sha256', $normalizedEmail . ':' . $otp, $secret);
}

function hashToken($token)
{
    return hash('sha256', $token);
}

function generateOTP()
{
    return sprintf("%06d", random_int(100000, 999999));
}

function validateCSRF($token)
{
    if (empty($_SESSION['csrf_token']) || empty($token)) {
        return false;
    }
    return hash_equals($_SESSION['csrf_token'], $token);
}

function validatePasswordPolicy($password)
{
    if (!is_string($password)) {
        return ['valid' => false, 'message' => 'Password must be a valid text string.'];
    }
    if (trim($password) === '') {
        return ['valid' => false, 'message' => 'Password cannot be empty or whitespace only.'];
    }
    if (strlen($password) < 8) {
        return ['valid' => false, 'message' => 'Password must be at least 8 characters long.'];
    }
    if (strlen($password) > 128) {
        return ['valid' => false, 'message' => 'Password cannot exceed 128 characters.'];
    }
    return ['valid' => true];
}

function getClientIP()
{
    if (!empty($_SERVER['HTTP_CF_CONNECTING_IP'])) {
        return trim($_SERVER['HTTP_CF_CONNECTING_IP']);
    }
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ips = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
        return trim($ips[0]);
    }
    return !empty($_SERVER['REMOTE_ADDR']) ? trim($_SERVER['REMOTE_ADDR']) : '0.0.0.0';
}

function checkAuthRateLimit($conn, $identifier, $maxAttempts = 5, $decayMinutes = 60, $blockMinutes = 60, $cooldownSeconds = 60)
{
    $now = date('Y-m-d H:i:s');
    try {
        $stmt = $conn->prepare("SELECT attempts, last_attempt, block_until FROM php_auth_rate_limits WHERE identifier = ?");
        $stmt->execute([$identifier]);
        $limit = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($limit) {
            if (!empty($limit['block_until']) && strtotime($limit['block_until']) > time()) {
                $remaining = max(1, (int)ceil((strtotime($limit['block_until']) - time()) / 60));
                return [
                    'allowed' => false,
                    'message' => "Too many requests. Please try again after {$remaining} minute(s)."
                ];
            }

            $secondsSinceLast = time() - strtotime($limit['last_attempt']);
            if ($cooldownSeconds > 0 && $secondsSinceLast < $cooldownSeconds) {
                $waitSeconds = $cooldownSeconds - $secondsSinceLast;
                return [
                    'allowed' => false,
                    'message' => "Please wait {$waitSeconds} second(s) before requesting another OTP."
                ];
            }

            $decayTime = time() - ($decayMinutes * 60);
            $attempts = (int)$limit['attempts'] + 1;
            if (strtotime($limit['last_attempt']) < $decayTime || (!empty($limit['block_until']) && strtotime($limit['block_until']) <= time())) {
                $attempts = 1;
            }

            if ($attempts > $maxAttempts) {
                $blockUntil = date('Y-m-d H:i:s', time() + ($blockMinutes * 60));
                $upd = $conn->prepare("UPDATE php_auth_rate_limits SET attempts = ?, last_attempt = ?, block_until = ? WHERE identifier = ?");
                $upd->execute([$attempts, $now, $blockUntil, $identifier]);
                return [
                    'allowed' => false,
                    'message' => "Too many requests. Please try again after {$blockMinutes} minute(s)."
                ];
            } else {
                $upd = $conn->prepare("UPDATE php_auth_rate_limits SET attempts = ?, last_attempt = ?, block_until = NULL WHERE identifier = ?");
                $upd->execute([$attempts, $now, $identifier]);
                return ['allowed' => true];
            }
        } else {
            $ins = $conn->prepare("INSERT INTO php_auth_rate_limits (identifier, attempts, last_attempt) VALUES (?, 1, ?)");
            $ins->execute([$identifier, $now]);
            return ['allowed' => true];
        }
    } catch (PDOException $e) {
        error_log("Rate limit query notice: " . $e->getMessage());
        return ['allowed' => true];
    }
}

function getMailConfig()
{
    return [
        'host'       => getenv('SMTP_HOST') ?: (defined('SMTP_HOST') ? SMTP_HOST : 'smtp.hostinger.com'),
        'port'       => (int)(getenv('SMTP_PORT') ?: (defined('SMTP_PORT') ? SMTP_PORT : 587)),
        'username'   => getenv('SMTP_USERNAME') ?: (defined('SMTP_USERNAME') ? SMTP_USERNAME : 'info@openadmissions.in'),
        'password'   => getenv('SMTP_PASSWORD') ?: (defined('SMTP_PASSWORD') ? SMTP_PASSWORD : ''),
        'from_email' => getenv('SMTP_FROM_EMAIL') ?: (defined('SMTP_FROM_EMAIL') ? SMTP_FROM_EMAIL : 'info@openadmissions.in'),
        'from_name'  => getenv('SMTP_FROM_NAME') ?: (defined('SMTP_FROM_NAME') ? SMTP_FROM_NAME : 'AARAMBH INSTITUTE'),
    ];
}

function sendPasswordResetOTP($email, $otp, $full_name = 'Student')
{
    $config = getMailConfig();

    if (empty($config['password'])) {
        error_log("SMTP warning: SMTP_PASSWORD is not configured in environment or configuration.");
    }

    $mail = new PHPMailer(true);

    try {
        $mail->SMTPDebug = 0;
        $mail->isSMTP();
        $mail->Host       = $config['host'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $config['username'];
        $mail->Password   = $config['password'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = $config['port'];
        $mail->Timeout    = 30;

        // TLS Certificate verification is kept enabled (standard secure PHPMailer default).

        $mail->setFrom($config['from_email'], $config['from_name']);
        $mail->addAddress($email, $full_name);
        $mail->addReplyTo($config['from_email'], $config['from_name']);

        $mail->isHTML(true);
        $mail->Subject = 'Password Reset OTP - AARAMBH INSTITUTE';
        $mail->Body    = "
            <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;'>
                <h2 style='color: #c40138;'>Password Reset Request</h2>
                <p>Dear " . htmlspecialchars($full_name, ENT_QUOTES, 'UTF-8') . ",</p>
                <p>We received a request to reset your password for your AARAMBH INSTITUTE LMS account. Please use the following OTP to reset your password:</p>
                <div style='background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0; border-radius: 5px;'>
                    {$otp}
                </div>
                <p>This OTP is valid for <strong>10 minutes</strong>.</p>
                <p>If you didn't request this password reset, please ignore this email or contact support.</p>
                <hr style='margin: 20px 0; border: none; border-top: 1px solid #e0e0e0;'>
                <p style='color: #666; font-size: 12px;'>This is an automated message, please do not reply to this email.</p>
            </div>
        ";
        $mail->AltBody = "Your OTP for password reset is: {$otp}. This OTP is valid for 10 minutes. If you didn't request this, please ignore.";

        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("Password reset email sending failed: " . $mail->ErrorInfo);
        return false;
    }
}

function cleanInput($data)
{
    return htmlspecialchars(strip_tags(trim($data)));
}

$current_step = 1;
$email = '';

if (isset($_SESSION['reset_email']) && !empty($_SESSION['reset_email'])) {
    $email = $_SESSION['reset_email'];
    $current_step = 2;
}

if (isset($_SESSION['reset_verified']) && $_SESSION['reset_verified'] === true && !empty($_SESSION['reset_token'])) {
    if (isset($_SESSION['reset_verified_time']) && (time() - $_SESSION['reset_verified_time']) <= 900) {
        $current_step = 3;
    } else {
        unset($_SESSION['reset_verified'], $_SESSION['reset_token'], $_SESSION['reset_verified_time']);
        $current_step = 1;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $response = ['success' => false, 'message' => '', 'step' => 1];
    $action = isset($_POST['action']) ? $_POST['action'] : '';

    // Enforce CSRF protection on all POST actions
    $csrf_token = isset($_POST['csrf_token']) ? $_POST['csrf_token'] : (isset($_SERVER['HTTP_X_CSRF_TOKEN']) ? $_SERVER['HTTP_X_CSRF_TOKEN'] : '');
    if (!validateCSRF($csrf_token)) {
        $response['message'] = 'Invalid or expired security token. Please refresh the page.';
        ob_clean();
        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
    }

    if ($action === 'send_otp') {
        $email = isset($_POST['email']) ? cleanInput($_POST['email']) : '';
        $normalizedEmail = strtolower($email);

        if (empty($email)) {
            $response['message'] = 'Email address is required';
        } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $response['message'] = 'Invalid email format';
        } else {
            // Server-side rate limiting & cooldown
            $clientIP = getClientIP();
            $emailRate = checkAuthRateLimit($conn, "email:reset:{$normalizedEmail}", 5, 60, 60, 60);
            if (!$emailRate['allowed']) {
                $response['message'] = $emailRate['message'];
                ob_clean();
                header('Content-Type: application/json');
                echo json_encode($response);
                exit;
            }

            $ipRate = checkAuthRateLimit($conn, "ip:reset:{$clientIP}", 15, 60, 60, 10);
            if (!$ipRate['allowed']) {
                $response['message'] = $ipRate['message'];
                ob_clean();
                header('Content-Type: application/json');
                echo json_encode($response);
                exit;
            }

            // Session cooldown check
            if (isset($_SESSION['reset_otp_sent_time']) && (time() - $_SESSION['reset_otp_sent_time']) < 60) {
                $wait = 60 - (time() - $_SESSION['reset_otp_sent_time']);
                $response['message'] = "Please wait {$wait} second(s) before requesting another OTP.";
                ob_clean();
                header('Content-Type: application/json');
                echo json_encode($response);
                exit;
            }

            try {
                $stmt = $conn->prepare("SELECT id, full_name FROM students WHERE email = ?");
                $stmt->execute([$normalizedEmail]);
                $student = $stmt->fetch(PDO::FETCH_ASSOC);

                if (!$student) {
                    // Constant timing delay to avoid account enumeration
                    usleep(150000);
                    $_SESSION['reset_email'] = $normalizedEmail;
                    $_SESSION['reset_step'] = 'otp_sent';
                    $_SESSION['reset_otp_sent_time'] = time();
                    $response['success'] = true;
                    $response['message'] = 'If an account exists with this email, an OTP has been sent.';
                    $response['step'] = 2;
                } else {
                    $otp = generateOTP();
                    $hashedOtp = hashOTP($normalizedEmail, $otp);
                    $expiry_time = date('Y-m-d H:i:s', strtotime('+10 minutes'));

                    $stmt = $conn->prepare("DELETE FROM password_reset_otps WHERE email = ?");
                    $stmt->execute([$normalizedEmail]);

                    try {
                        $stmt = $conn->prepare("INSERT INTO password_reset_otps (email, otp, attempts, expiry_time, is_used) VALUES (?, ?, 0, ?, 0)");
                        $inserted = $stmt->execute([$normalizedEmail, $hashedOtp, $expiry_time]);
                    } catch (PDOException $pe) {
                        $stmt = $conn->prepare("INSERT INTO password_reset_otps (email, otp, expiry_time, is_used) VALUES (?, ?, ?, 0)");
                        $inserted = $stmt->execute([$normalizedEmail, $hashedOtp, $expiry_time]);
                    }

                    if ($inserted) {
                        $emailSent = sendPasswordResetOTP($normalizedEmail, $otp, $student['full_name']);
                        if ($emailSent) {
                            $_SESSION['reset_email'] = $normalizedEmail;
                            $_SESSION['reset_step'] = 'otp_sent';
                            $_SESSION['reset_otp_sent_time'] = time();
                            $response['success'] = true;
                            $response['message'] = 'If an account exists with this email, an OTP has been sent.';
                            $response['step'] = 2;
                        } else {
                            $response['message'] = 'Failed to send OTP email. Please try again later.';
                        }
                    } else {
                        $response['message'] = 'Database error occurred';
                    }
                }
            } catch (PDOException $e) {
                error_log("Password reset OTP send error: " . $e->getMessage());
                $response['message'] = 'Server error occurred';
            }
        }

        ob_clean();
        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
    } elseif ($action === 'verify_otp') {
        $email = isset($_POST['email']) ? cleanInput($_POST['email']) : '';
        $otp = isset($_POST['otp']) ? cleanInput($_POST['otp']) : '';
        $normalizedEmail = strtolower($email);

        if (empty($email) || empty($otp)) {
            $response['message'] = 'Email and OTP are required';
        } else {
            // IP verification rate limit
            $clientIP = getClientIP();
            $ipRate = checkAuthRateLimit($conn, "ip:reset_verify:{$clientIP}", 20, 15, 15, 0);
            if (!$ipRate['allowed']) {
                $response['message'] = $ipRate['message'];
                ob_clean();
                header('Content-Type: application/json');
                echo json_encode($response);
                exit;
            }

            try {
                $current_time = date('Y-m-d H:i:s');

                $stmt = $conn->prepare("SELECT * FROM password_reset_otps WHERE email = ? AND expiry_time > ? AND is_used = 0 ORDER BY id DESC LIMIT 1");
                $stmt->execute([$normalizedEmail, $current_time]);
                $otpRecord = $stmt->fetch(PDO::FETCH_ASSOC);

                if (!$otpRecord) {
                    $response['message'] = 'Invalid or expired OTP. Please request a new OTP.';
                } else {
                    $currentAttempts = isset($otpRecord['attempts']) ? (int)$otpRecord['attempts'] : 0;

                    if ($currentAttempts >= 5) {
                        $upd = $conn->prepare("UPDATE password_reset_otps SET is_used = 1 WHERE id = ?");
                        $upd->execute([$otpRecord['id']]);
                        $response['message'] = 'Maximum verification attempts exceeded. Please request a new OTP.';
                    } else {
                        $expectedHash = hashOTP($normalizedEmail, $otp);
                        $isMatch = hash_equals($otpRecord['otp'], $expectedHash);

                        if (!$isMatch) {
                            $newAttempts = $currentAttempts + 1;
                            try {
                                $upd = $conn->prepare("UPDATE password_reset_otps SET attempts = ? WHERE id = ?");
                                $upd->execute([$newAttempts, $otpRecord['id']]);
                            } catch (PDOException $e) {
                                // attempts column pending migration
                            }

                            $remaining = 5 - $newAttempts;
                            if ($remaining <= 0) {
                                $upd = $conn->prepare("UPDATE password_reset_otps SET is_used = 1 WHERE id = ?");
                                $upd->execute([$otpRecord['id']]);
                                $response['message'] = 'Incorrect OTP. Maximum attempts exceeded. Please request a new OTP.';
                            } else {
                                $response['message'] = "Incorrect OTP. {$remaining} attempt(s) remaining.";
                            }
                        } else {
                            // OTP is verified!
                            $resetToken = bin2hex(random_bytes(32));
                            $tokenHash = hashToken($resetToken);
                            $tokenExpiry = date('Y-m-d H:i:s', time() + (15 * 60)); // 15 mins window

                            // Invalidate the OTP immediately and bind the reset_token
                            try {
                                $upd = $conn->prepare("UPDATE password_reset_otps SET is_used = 1, reset_token = ?, expiry_time = ? WHERE id = ?");
                                $upd->execute([$tokenHash, $tokenExpiry, $otpRecord['id']]);
                            } catch (PDOException $e) {
                                $upd = $conn->prepare("UPDATE password_reset_otps SET is_used = 1 WHERE id = ?");
                                $upd->execute([$otpRecord['id']]);
                            }

                            session_regenerate_id(true);

                            $_SESSION['reset_email'] = $normalizedEmail;
                            $_SESSION['reset_verified'] = true;
                            $_SESSION['reset_token'] = $resetToken;
                            $_SESSION['reset_verified_time'] = time();

                            $response['success'] = true;
                            $response['message'] = 'OTP verified successfully';
                            $response['reset_token'] = $resetToken;
                            $response['step'] = 3;
                        }
                    }
                }
            } catch (PDOException $e) {
                error_log("OTP verify error: " . $e->getMessage());
                $response['message'] = 'Server error occurred';
            }
        }

        ob_clean();
        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
    } elseif ($action === 'reset_password') {
        $email = isset($_POST['email']) ? cleanInput($_POST['email']) : '';
        $password = isset($_POST['password']) ? $_POST['password'] : '';
        $confirm_password = isset($_POST['confirm_password']) ? $_POST['confirm_password'] : '';
        $submittedResetToken = isset($_POST['reset_token']) ? cleanInput($_POST['reset_token']) : (isset($_SESSION['reset_token']) ? $_SESSION['reset_token'] : '');
        $normalizedEmail = strtolower($email);

        $sessionVerified = isset($_SESSION['reset_verified']) && $_SESSION['reset_verified'] === true && isset($_SESSION['reset_email']) && $_SESSION['reset_email'] === $normalizedEmail;
        $sessionNotExpired = isset($_SESSION['reset_verified_time']) && (time() - $_SESSION['reset_verified_time']) <= 900;

        if (!$sessionVerified || !$sessionNotExpired || empty($submittedResetToken)) {
            $response['message'] = 'Your reset authorization session has expired or is invalid. Please start over.';
        } elseif (!empty($_SESSION['reset_token']) && !hash_equals($_SESSION['reset_token'], $submittedResetToken)) {
            $response['message'] = 'Invalid reset authorization token. Please start over.';
        } else {
            $errors = [];

            $pwdCheck = validatePasswordPolicy($password);
            if (!$pwdCheck['valid']) {
                $errors[] = $pwdCheck['message'];
            }

            if (empty($confirm_password)) {
                $errors[] = 'Please confirm your password';
            } elseif ($password !== $confirm_password) {
                $errors[] = 'Passwords do not match';
            }

            if (empty($errors)) {
                try {
                    $conn->beginTransaction();

                    $currentTime = date('Y-m-d H:i:s');
                    $tokenStmt = $conn->prepare("SELECT id, reset_token FROM password_reset_otps WHERE email = ? AND is_used = 1 AND expiry_time > ? ORDER BY id DESC LIMIT 1");
                    $tokenStmt->execute([$normalizedEmail, $currentTime]);
                    $tokenRecord = $tokenStmt->fetch(PDO::FETCH_ASSOC);

                    if (!$tokenRecord) {
                        throw new Exception('Reset authorization has expired. Please verify OTP again.');
                    }

                    if (!empty($tokenRecord['reset_token'])) {
                        if (!hash_equals($tokenRecord['reset_token'], hashToken($submittedResetToken))) {
                            throw new Exception('Invalid reset authorization token.');
                        }
                    }

                    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

                    // Update student password
                    $stmt = $conn->prepare("UPDATE students SET password = ? WHERE email = ?");
                    $stmt->execute([$hashed_password, $normalizedEmail]);

                    // Invalidate all reset tokens for this email
                    $stmt = $conn->prepare("DELETE FROM password_reset_otps WHERE email = ?");
                    $stmt->execute([$normalizedEmail]);

                    $conn->commit();

                    // Clean up session and regenerate ID
                    unset(
                        $_SESSION['reset_email'],
                        $_SESSION['reset_verified'],
                        $_SESSION['reset_token'],
                        $_SESSION['reset_step'],
                        $_SESSION['reset_otp_sent_time'],
                        $_SESSION['reset_verified_time']
                    );
                    session_regenerate_id(true);

                    $response['success'] = true;
                    $response['message'] = 'Password reset successful! Please login with your new password.';
                    $response['redirect'] = BASE_URL . '/login.php';
                } catch (Exception $e) {
                    $conn->rollBack();
                    $response['message'] = $e->getMessage();
                    error_log("Password reset error: " . $e->getMessage());
                }
            } else {
                $response['message'] = implode(', ', $errors);
            }
        }

        ob_clean();
        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
    }
}

ob_end_flush();
?>

<style>
    .l360-forgot-container {
        max-width: 500px;
        margin: 60px auto;
        padding: 0 20px;
    }

    .l360-forgot-card {
        background: var(--l360-white);
        border-radius: 5px;
        border: 1px solid var(--l360-gray-light);
        padding: 40px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
    }

    .l360-forgot-header {
        text-align: center;
        margin-bottom: 30px;
    }

    .l360-forgot-header h2 {
        color: var(--l360-dark);
        font-size: 22px;
        font-weight: 600;
        margin-bottom: 10px;
    }

    .l360-forgot-header p {
        color: var(--l360-gray);
        font-size: 14px;
    }

    .l360-forgot-header .step-indicator {
        display: flex;
        justify-content: center;
        gap: 30px;
        margin-top: 20px;
    }

    .l360-step {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
    }

    .l360-step .step-number {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: var(--l360-gray-light);
        color: var(--l360-gray);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 14px;
    }

    .l360-step .step-number.active {
        background: var(--l360-accent);
        color: var(--l360-white);
    }

    .l360-step .step-number.completed {
        background: #2e7d32;
        color: var(--l360-white);
    }

    .l360-step .step-label {
        font-size: 11px;
        color: var(--l360-gray);
    }

    .l360-step .step-label.active {
        color: var(--l360-accent);
        font-weight: 600;
    }

    .l360-step .step-label.completed {
        color: #2e7d32;
    }

    .l360-form-group {
        margin-bottom: 25px;
    }

    .l360-form-group label {
        display: block;
        font-size: 13px;
        font-weight: 600;
        color: var(--l360-dark);
        margin-bottom: 8px;
    }

    .l360-form-group label span {
        color: var(--l360-accent);
    }

    .l360-form-group input {
        width: 100%;
        padding: 12px 15px;
        border: 1px solid var(--l360-gray-light);
        border-radius: 4px;
        font-size: 14px;
        transition: var(--l360-transition);
        background: var(--l360-white);
    }

    .l360-form-group input.error-input {
        border-color: var(--l360-accent);
        background-color: #fff0f0;
    }

    .l360-form-group input:focus {
        outline: none;
        border-color: var(--l360-accent);
        box-shadow: 0 0 0 2px rgba(196, 1, 56, 0.1);
    }

    .l360-password-wrapper {
        position: relative;
    }

    .l360-password-toggle {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        color: var(--l360-gray);
        background: none;
        border: none;
        font-size: 16px;
    }

    .l360-password-toggle:hover {
        color: var(--l360-accent);
    }

    .error-message {
        font-size: 12px;
        color: var(--l360-accent);
        margin-top: 5px;
        display: block;
    }

    .l360-email-wrapper {
        display: flex;
        gap: 10px;
        align-items: center;
    }

    .l360-email-wrapper input {
        flex: 1;
    }

    .l360-otp-btn {
        background: var(--l360-dark);
        color: var(--l360-white);
        border: none;
        border-radius: 4px;
        padding: 10px 20px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        white-space: nowrap;
        transition: var(--l360-transition);
    }

    .l360-otp-btn:hover:not(:disabled) {
        background: var(--l360-accent);
    }

    .l360-otp-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .l360-otp-status {
        font-size: 12px;
        margin-top: 5px;
        display: block;
    }

    .l360-otp-status.success {
        color: #2e7d32;
    }

    .l360-otp-status.error {
        color: var(--l360-accent);
    }

    .l360-submit-btn {
        width: 100%;
        padding: 12px 25px;
        background: var(--l360-accent);
        color: var(--l360-white);
        border: none;
        border-radius: 4px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: var(--l360-transition);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }

    .l360-submit-btn:hover:not(:disabled) {
        background: #a0012e;
        transform: translateY(-2px);
    }

    .l360-submit-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .l360-login-link {
        text-align: center;
        margin-top: 25px;
        padding-top: 20px;
        border-top: 1px solid var(--l360-gray-light);
        font-size: 13px;
        color: var(--l360-gray);
    }

    .l360-login-link a {
        color: var(--l360-accent);
        text-decoration: none;
        font-weight: 600;
    }

    .l360-login-link a:hover {
        text-decoration: underline;
    }

    .loading-spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid #ffffff;
        border-radius: 50%;
        border-top-color: transparent;
        animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    .toast-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-size: 14px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    }

    .toast-success {
        background-color: #2e7d32;
    }

    .toast-error {
        background-color: #c40138;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }

        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .step-content {
        display: none;
    }

    .step-content.active-step {
        display: block;
    }

    @media (max-width: 768px) {
        .l360-forgot-container {
            margin: 40px auto;
        }

        .l360-forgot-card {
            padding: 25px;
        }

        .l360-email-wrapper {
            flex-direction: column;
        }

        .l360-otp-btn {
            width: 100%;
        }

        .step-indicator {
            gap: 15px !important;
        }

        .step-label {
            font-size: 9px !important;
        }
    }
</style>

<div class="l360-forgot-container">
    <div class="l360-forgot-card">
        <div class="l360-forgot-header">
            <h2>Forgot Password?</h2>
            <p>Reset your password in three simple steps</p>
            <div class="step-indicator">
                <div class="l360-step">
                    <div class="step-number" id="step1Num">1</div>
                    <div class="step-label" id="step1Label">Enter Email</div>
                </div>
                <div class="l360-step">
                    <div class="step-number" id="step2Num">2</div>
                    <div class="step-label" id="step2Label">Verify OTP</div>
                </div>
                <div class="l360-step">
                    <div class="step-number" id="step3Num">3</div>
                    <div class="step-label" id="step3Label">Reset Password</div>
                </div>
            </div>
        </div>

        <div id="step1" class="step-content <?php echo $current_step == 1 ? 'active-step' : ''; ?>">
            <form id="forgotForm">
                <input type="hidden" name="csrf_token" id="forgot_csrf_token" value="<?php echo htmlspecialchars($_SESSION['csrf_token'], ENT_QUOTES, 'UTF-8'); ?>">
                <div class="l360-form-group" id="emailGroup">
                    <label>Registered Email Address <span>*</span></label>
                    <div class="l360-email-wrapper">
                        <input type="email" name="email" id="reset_email" placeholder="Enter your registered email" value="<?php echo htmlspecialchars($email); ?>">
                        <button type="button" class="l360-otp-btn" id="sendResetOtpBtn">Send OTP</button>
                    </div>
                    <span class="l360-otp-status" id="emailStatus"></span>
                    <span class="error-message" id="emailError"></span>
                </div>
            </form>
        </div>

        <div id="step2" class="step-content <?php echo $current_step == 2 ? 'active-step' : ''; ?>">
            <form id="otpForm">
                <input type="hidden" name="csrf_token" id="otp_csrf_token" value="<?php echo htmlspecialchars($_SESSION['csrf_token'], ENT_QUOTES, 'UTF-8'); ?>">
                <div class="l360-form-group" id="otpGroup">
                    <label>Enter OTP <span>*</span></label>
                    <input type="text" name="otp" id="reset_otp" placeholder="Enter 6-digit OTP">
                    <button type="button" class="l360-otp-btn" id="verifyResetOtpBtn" style="margin-top: 15px; width: 100%;">Verify OTP</button>
                    <span class="error-message" id="otpError"></span>
                </div>
                <div class="l360-login-link">
                    <a href="#" id="resendOtpLink">Resend OTP</a> |
                    <a href="forgot-password.php">Use different email</a>
                </div>
            </form>
        </div>

        <div id="step3" class="step-content <?php echo $current_step == 3 ? 'active-step' : ''; ?>">
            <form id="resetPasswordForm">
                <input type="hidden" name="csrf_token" id="reset_csrf_token" value="<?php echo htmlspecialchars($_SESSION['csrf_token'], ENT_QUOTES, 'UTF-8'); ?>">
                <input type="hidden" name="reset_token" id="hidden_reset_token" value="<?php echo isset($_SESSION['reset_token']) ? htmlspecialchars($_SESSION['reset_token'], ENT_QUOTES, 'UTF-8') : ''; ?>">
                <div class="l360-form-group" id="newPasswordGroup">
                    <label>New Password <span>*</span></label>
                    <div class="l360-password-wrapper">
                        <input type="password" name="password" id="new_password" placeholder="Enter new password (min. 8 characters)">
                        <button type="button" class="l360-password-toggle" id="toggleNewPassword">
                            <i class="fa-regular fa-eye"></i>
                        </button>
                    </div>
                    <span class="error-message" id="newPasswordError"></span>
                </div>

                <div class="l360-form-group" id="confirmPasswordGroup">
                    <label>Confirm Password <span>*</span></label>
                    <div class="l360-password-wrapper">
                        <input type="password" name="confirm_password" id="confirm_password_reset" placeholder="Confirm your new password">
                        <button type="button" class="l360-password-toggle" id="toggleConfirmPassword">
                            <i class="fa-regular fa-eye"></i>
                        </button>
                    </div>
                    <span class="error-message" id="confirmPasswordError"></span>
                </div>

                <button type="submit" class="l360-submit-btn" id="resetPasswordBtn">
                    <i class="fa-solid fa-key"></i>
                    Reset Password
                </button>

                <div class="l360-login-link">
                    <a href="<?php echo BASE_URL ?>/login.php">Back to Login</a>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
    let currentStep = <?php echo $current_step; ?>;
    let resetEmail = '<?php echo addslashes($email); ?>';
    let otpTimer = null;
    let otpCooldown = false;
    const csrfToken = "<?php echo htmlspecialchars($_SESSION['csrf_token'], ENT_QUOTES, 'UTF-8'); ?>";
    let resetToken = "<?php echo isset($_SESSION['reset_token']) ? htmlspecialchars($_SESSION['reset_token'], ENT_QUOTES, 'UTF-8') : ''; ?>";

    function updateStepUI() {
        document.getElementById('step1').classList.remove('active-step');
        document.getElementById('step2').classList.remove('active-step');
        document.getElementById('step3').classList.remove('active-step');

        document.getElementById(`step${currentStep}`).classList.add('active-step');

        for (let i = 1; i <= 3; i++) {
            const stepNum = document.getElementById(`step${i}Num`);
            const stepLabel = document.getElementById(`step${i}Label`);

            if (i < currentStep) {
                stepNum.classList.add('completed');
                stepNum.classList.remove('active');
                stepLabel.classList.add('completed');
                stepLabel.classList.remove('active');
            } else if (i === currentStep) {
                stepNum.classList.add('active');
                stepNum.classList.remove('completed');
                stepLabel.classList.add('active');
                stepLabel.classList.remove('completed');
            } else {
                stepNum.classList.remove('active', 'completed');
                stepLabel.classList.remove('active', 'completed');
            }
        }
    }

    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast-notification toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    function showFieldError(fieldId, errorMessage, groupId) {
        const errorSpan = document.getElementById(fieldId);
        const formGroup = document.getElementById(groupId);

        if (errorSpan) {
            errorSpan.textContent = errorMessage;
        }

        if (formGroup) {
            const inputInGroup = formGroup.querySelector('input');
            if (inputInGroup) {
                inputInGroup.classList.add('error-input');
            }
        }
    }

    function clearAllErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => {
            msg.textContent = '';
        });

        const errorInputs = document.querySelectorAll('.error-input');
        errorInputs.forEach(input => {
            input.classList.remove('error-input');
        });
    }

    function clearFieldError(fieldId, groupId) {
        const errorSpan = document.getElementById(fieldId);
        const formGroup = document.getElementById(groupId);

        if (errorSpan) {
            errorSpan.textContent = '';
        }

        if (formGroup) {
            const inputInGroup = formGroup.querySelector('input');
            if (inputInGroup) {
                inputInGroup.classList.remove('error-input');
            }
        }
    }

    document.getElementById('sendResetOtpBtn').addEventListener('click', async function() {
        if (otpCooldown) {
            showToast('Please wait before requesting another OTP', 'error');
            return;
        }

        const email = document.getElementById('reset_email').value.trim();
        const emailStatusSpan = document.getElementById('emailStatus');

        clearFieldError('emailError', 'emailGroup');

        if (!email) {
            showFieldError('emailError', 'Please enter your email address', 'emailGroup');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFieldError('emailError', 'Please enter a valid email address', 'emailGroup');
            return;
        }

        const btn = this;
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span class="loading-spinner"></span> Sending...';
        btn.disabled = true;

        try {
            const formData = new FormData();
            formData.append('action', 'send_otp');
            formData.append('email', email);
            formData.append('csrf_token', csrfToken);

            const response = await fetch(window.location.href, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                resetEmail = email;
                emailStatusSpan.textContent = '✓ ' + data.message;
                emailStatusSpan.className = 'l360-otp-status success';
                showToast(data.message, 'success');

                currentStep = 2;
                updateStepUI();

                otpCooldown = true;
                let secondsLeft = 60;
                btn.textContent = `Resend OTP (${secondsLeft}s)`;

                otpTimer = setInterval(() => {
                    secondsLeft--;
                    if (secondsLeft <= 0) {
                        clearInterval(otpTimer);
                        btn.textContent = 'Send OTP';
                        btn.disabled = false;
                        otpCooldown = false;
                    } else {
                        btn.textContent = `Resend OTP (${secondsLeft}s)`;
                    }
                }, 1000);
            } else {
                emailStatusSpan.textContent = '✗ ' + data.message;
                emailStatusSpan.className = 'l360-otp-status error';
                showToast(data.message, 'error');
                btn.textContent = originalText;
                btn.disabled = false;
            }
        } catch (error) {
            console.error('Error:', error);
            emailStatusSpan.textContent = '✗ Failed to send OTP. Please try again.';
            emailStatusSpan.className = 'l360-otp-status error';
            showToast('Failed to send OTP. Please try again.', 'error');
            btn.textContent = originalText;
            btn.disabled = false;
        }
    });

    document.getElementById('verifyResetOtpBtn').addEventListener('click', async function() {
        const email = document.getElementById('reset_email') ? document.getElementById('reset_email').value.trim() : resetEmail;
        const otp = document.getElementById('reset_otp').value.trim();
        const otpErrorSpan = document.getElementById('otpError');

        if (!otp) {
            showFieldError('otpError', 'Please enter OTP', 'otpGroup');
            return;
        }

        const btn = this;
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span class="loading-spinner"></span> Verifying...';
        btn.disabled = true;

        try {
            const formData = new FormData();
            formData.append('action', 'verify_otp');
            formData.append('email', email);
            formData.append('otp', otp);
            formData.append('csrf_token', csrfToken);

            const response = await fetch(window.location.href, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                if (data.reset_token) {
                    resetToken = data.reset_token;
                }
                showToast('OTP verified successfully!', 'success');
                currentStep = 3;
                updateStepUI();
            } else {
                showFieldError('otpError', data.message, 'otpGroup');
                showToast(data.message, 'error');
                btn.textContent = originalText;
                btn.disabled = false;
            }
        } catch (error) {
            console.error('Error:', error);
            showFieldError('otpError', 'Verification failed. Please try again.', 'otpGroup');
            showToast('Verification failed. Please try again.', 'error');
            btn.textContent = originalText;
            btn.disabled = false;
        }
    });

    document.getElementById('resendOtpLink').addEventListener('click', async function(e) {
        e.preventDefault();

        if (otpCooldown) {
            showToast('Please wait before requesting another OTP', 'error');
            return;
        }

        const email = resetEmail;

        if (!email) {
            showToast('Email address not found. Please start over.', 'error');
            return;
        }

        const btn = document.getElementById('sendResetOtpBtn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span class="loading-spinner"></span> Sending...';
        btn.disabled = true;

        try {
            const formData = new FormData();
            formData.append('action', 'send_otp');
            formData.append('email', email);
            formData.append('csrf_token', csrfToken);

            const response = await fetch(window.location.href, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                showToast(data.message, 'success');

                otpCooldown = true;
                let secondsLeft = 60;
                btn.textContent = `Resend OTP (${secondsLeft}s)`;

                if (otpTimer) clearInterval(otpTimer);
                otpTimer = setInterval(() => {
                    secondsLeft--;
                    if (secondsLeft <= 0) {
                        clearInterval(otpTimer);
                        btn.textContent = 'Send OTP';
                        btn.disabled = false;
                        otpCooldown = false;
                    } else {
                        btn.textContent = `Resend OTP (${secondsLeft}s)`;
                    }
                }, 1000);
            } else {
                showToast(data.message, 'error');
                btn.textContent = originalText;
                btn.disabled = false;
            }
        } catch (error) {
            console.error('Error:', error);
            showToast('Failed to resend OTP. Please try again.', 'error');
            btn.textContent = originalText;
            btn.disabled = false;
        }
    });

    document.getElementById('resetPasswordForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        clearAllErrors();

        const email = resetEmail;
        const password = document.getElementById('new_password').value;
        const confirmPassword = document.getElementById('confirm_password_reset').value;

        let isValid = true;

        if (!password) {
            showFieldError('newPasswordError', 'Password is required', 'newPasswordGroup');
            isValid = false;
        } else if (password.length < 8) {
            showFieldError('newPasswordError', 'Password must be at least 8 characters', 'newPasswordGroup');
            isValid = false;
        } else if (password.length > 128) {
            showFieldError('newPasswordError', 'Password cannot exceed 128 characters', 'newPasswordGroup');
            isValid = false;
        }

        if (!confirmPassword) {
            showFieldError('confirmPasswordError', 'Please confirm your password', 'confirmPasswordGroup');
            isValid = false;
        } else if (password !== confirmPassword) {
            showFieldError('confirmPasswordError', 'Passwords do not match', 'confirmPasswordGroup');
            isValid = false;
        }

        if (isValid) {
            const submitBtn = document.getElementById('resetPasswordBtn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loading-spinner"></span> Resetting Password...';
            submitBtn.disabled = true;

            try {
                const formData = new FormData();
                formData.append('action', 'reset_password');
                formData.append('email', email);
                formData.append('password', password);
                formData.append('confirm_password', confirmPassword);
                formData.append('csrf_token', csrfToken);
                formData.append('reset_token', resetToken);

                const response = await fetch(window.location.href, {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    showToast(data.message, 'success');
                    if (data.redirect) {
                        setTimeout(() => {
                            window.location.href = data.redirect;
                        }, 2000);
                    }
                } else {
                    showToast(data.message, 'error');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            } catch (error) {
                console.error('Error:', error);
                showToast('Password reset failed. Please try again.', 'error');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }
    });

    const toggleNewPassword = document.getElementById('toggleNewPassword');
    const newPasswordInput = document.getElementById('new_password');

    if (toggleNewPassword) {
        toggleNewPassword.addEventListener('click', function() {
            const type = newPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            newPasswordInput.setAttribute('type', type);
            this.innerHTML = type === 'password' ? '<i class="fa-regular fa-eye"></i>' : '<i class="fa-regular fa-eye-slash"></i>';
        });
    }

    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const confirmPasswordInput = document.getElementById('confirm_password_reset');

    if (toggleConfirmPassword) {
        toggleConfirmPassword.addEventListener('click', function() {
            const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPasswordInput.setAttribute('type', type);
            this.innerHTML = type === 'password' ? '<i class="fa-regular fa-eye"></i>' : '<i class="fa-regular fa-eye-slash"></i>';
        });
    }

    document.getElementById('reset_email')?.addEventListener('input', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(this.value.trim())) {
            clearFieldError('emailError', 'emailGroup');
            document.getElementById('emailStatus').textContent = '';
        }
    });

    document.getElementById('reset_otp')?.addEventListener('input', function() {
        if (this.value.trim()) {
            clearFieldError('otpError', 'otpGroup');
        }
    });

    document.getElementById('new_password')?.addEventListener('input', function() {
        if (this.value.length >= 8) {
            clearFieldError('newPasswordError', 'newPasswordGroup');
        }
        const confirmPwd = document.getElementById('confirm_password_reset');
        if (confirmPwd && confirmPwd.value && confirmPwd.value === this.value) {
            clearFieldError('confirmPasswordError', 'confirmPasswordGroup');
        }
    });

    document.getElementById('confirm_password_reset')?.addEventListener('input', function() {
        const password = document.getElementById('new_password').value;
        if (this.value === password && password.length >= 8) {
            clearFieldError('confirmPasswordError', 'confirmPasswordGroup');
        }
    });

    updateStepUI();
</script>

<?php
require_once __DIR__ . '/includes/footer.php';
?>
