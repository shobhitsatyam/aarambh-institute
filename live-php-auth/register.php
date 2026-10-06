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
        // Fallback gracefully if rate limit table is pending migration
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

function sendOTPEmail($email, $otp, $full_name = 'Student')
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
        $mail->Subject = 'OTP for Student Registration - AARAMBH INSTITUTE';
        $mail->Body    = "
            <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;'>
                <h2 style='color: #c40138;'>Email Verification</h2>
                <p>Dear Student,</p>
                <p>Thank you for registering with AARAMBH INSTITUTE. Please use the following OTP to complete your registration:</p>
                <div style='background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0; border-radius: 5px;'>
                    {$otp}
                </div>
                <p>This OTP is valid for <strong>10 minutes</strong>.</p>
                <p>If you didn't request this OTP, please ignore this email.</p>
                <hr style='margin: 20px 0; border: none; border-top: 1px solid #e0e0e0;'>
                <p style='color: #666; font-size: 12px;'>This is an automated message, please do not reply to this email.</p>
            </div>
        ";
        $mail->AltBody = "Your OTP for registration is: {$otp}. This OTP is valid for 10 minutes.";

        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("Email sending failed: " . $mail->ErrorInfo);
        return false;
    }
}

function cleanInput($data)
{
    return htmlspecialchars(strip_tags(trim($data)));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $response = ['success' => false, 'message' => ''];
    $action = isset($_POST['action']) ? $_POST['action'] : '';

    // Enforce CSRF protection for all POST actions
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
            $response['message'] = 'Email is required';
        } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $response['message'] = 'Invalid email format';
        } else {
            // Server-side rate limiting & cooldown
            $clientIP = getClientIP();
            $emailRate = checkAuthRateLimit($conn, "email:reg:{$normalizedEmail}", 5, 60, 60, 60);
            if (!$emailRate['allowed']) {
                $response['message'] = $emailRate['message'];
                ob_clean();
                header('Content-Type: application/json');
                echo json_encode($response);
                exit;
            }

            $ipRate = checkAuthRateLimit($conn, "ip:reg:{$clientIP}", 15, 60, 60, 10);
            if (!$ipRate['allowed']) {
                $response['message'] = $ipRate['message'];
                ob_clean();
                header('Content-Type: application/json');
                echo json_encode($response);
                exit;
            }

            // Check session cooldown as secondary defense
            if (isset($_SESSION['otp_sent_time']) && (time() - $_SESSION['otp_sent_time']) < 60) {
                $wait = 60 - (time() - $_SESSION['otp_sent_time']);
                $response['message'] = "Please wait {$wait} second(s) before requesting another OTP.";
                ob_clean();
                header('Content-Type: application/json');
                echo json_encode($response);
                exit;
            }

            try {
                $stmt = $conn->prepare("SELECT id FROM students WHERE email = ?");
                $stmt->execute([$normalizedEmail]);
                if ($stmt->fetch()) {
                    $response['message'] = 'Email already registered';
                } else {
                    $otp = generateOTP();
                    $hashedOtp = hashOTP($normalizedEmail, $otp);
                    $expiry_time = date('Y-m-d H:i:s', strtotime('+10 minutes'));

                    // Clean up existing OTPs for this email
                    $stmt = $conn->prepare("DELETE FROM otp_logs WHERE email = ?");
                    $stmt->execute([$normalizedEmail]);

                    // Insert hashed OTP (try modern schema with attempts column, fallback if not migrated yet)
                    try {
                        $stmt = $conn->prepare("INSERT INTO otp_logs (email, otp, attempts, expiry_time) VALUES (?, ?, 0, ?)");
                        $inserted = $stmt->execute([$normalizedEmail, $hashedOtp, $expiry_time]);
                    } catch (PDOException $pe) {
                        $stmt = $conn->prepare("INSERT INTO otp_logs (email, otp, expiry_time) VALUES (?, ?, ?)");
                        $inserted = $stmt->execute([$normalizedEmail, $hashedOtp, $expiry_time]);
                    }

                    if ($inserted) {
                        $emailSent = sendOTPEmail($normalizedEmail, $otp);
                        if ($emailSent) {
                            $_SESSION['otp_email'] = $normalizedEmail;
                            $_SESSION['otp_sent_time'] = time();
                            $response['success'] = true;
                            $response['message'] = 'OTP sent successfully';
                        } else {
                            $response['message'] = 'Failed to send OTP email. Please check your email address or try again later.';
                        }
                    } else {
                        $response['message'] = 'Database error occurred';
                    }
                }
            } catch (PDOException $e) {
                error_log("OTP send error: " . $e->getMessage());
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
            $ipRate = checkAuthRateLimit($conn, "ip:verify:{$clientIP}", 20, 15, 15, 0);
            if (!$ipRate['allowed']) {
                $response['message'] = $ipRate['message'];
                ob_clean();
                header('Content-Type: application/json');
                echo json_encode($response);
                exit;
            }

            try {
                $current_time = date('Y-m-d H:i:s');
                $stmt = $conn->prepare("SELECT * FROM otp_logs WHERE email = ? AND expiry_time > ? ORDER BY id DESC LIMIT 1");
                $stmt->execute([$normalizedEmail, $current_time]);
                $otpRecord = $stmt->fetch(PDO::FETCH_ASSOC);

                if (!$otpRecord) {
                    $response['message'] = 'Invalid or expired OTP. Please request a new OTP.';
                } else {
                    $currentAttempts = isset($otpRecord['attempts']) ? (int)$otpRecord['attempts'] : 0;

                    // Enforce max 5 failed attempts
                    if ($currentAttempts >= 5) {
                        $del = $conn->prepare("DELETE FROM otp_logs WHERE id = ?");
                        $del->execute([$otpRecord['id']]);
                        $response['message'] = 'Maximum verification attempts exceeded. Please request a new OTP.';
                    } else {
                        $expectedHash = hashOTP($normalizedEmail, $otp);
                        $isMatch = hash_equals($otpRecord['otp'], $expectedHash);

                        if (!$isMatch) {
                            $newAttempts = $currentAttempts + 1;
                            try {
                                $upd = $conn->prepare("UPDATE otp_logs SET attempts = ? WHERE id = ?");
                                $upd->execute([$newAttempts, $otpRecord['id']]);
                            } catch (PDOException $e) {
                                // attempts column may not exist yet
                            }

                            $remaining = 5 - $newAttempts;
                            if ($remaining <= 0) {
                                $del = $conn->prepare("DELETE FROM otp_logs WHERE id = ?");
                                $del->execute([$otpRecord['id']]);
                                $response['message'] = 'Incorrect OTP. Maximum attempts exceeded. Please request a new OTP.';
                            } else {
                                $response['message'] = "Incorrect OTP. {$remaining} attempt(s) remaining.";
                            }
                        } else {
                            // OTP verification succeeded!
                            // Immediately delete raw OTP to prevent replay
                            $del = $conn->prepare("DELETE FROM otp_logs WHERE id = ?");
                            $del->execute([$otpRecord['id']]);

                            // Generate short-lived registration authorization token
                            $regToken = bin2hex(random_bytes(32));
                            $tokenHash = hashToken($regToken);
                            $tokenExpiry = date('Y-m-d H:i:s', time() + (15 * 60)); // 15 minutes window

                            // Store token in DB
                            try {
                                $ins = $conn->prepare("INSERT INTO otp_logs (email, otp, attempts, expiry_time, verified_token) VALUES (?, 'VERIFIED', 0, ?, ?)");
                                $ins->execute([$normalizedEmail, $tokenExpiry, $tokenHash]);
                            } catch (PDOException $e) {
                                // Fallback if verified_token column not yet added
                                try {
                                    $ins = $conn->prepare("INSERT INTO otp_logs (email, otp, expiry_time) VALUES (?, 'VERIFIED', ?)");
                                    $ins->execute([$normalizedEmail, $tokenExpiry]);
                                } catch (PDOException $e2) {
                                    // ignore
                                }
                            }

                            // Regenerate session ID upon successful verification
                            session_regenerate_id(true);

                            $_SESSION['email_verified'] = true;
                            $_SESSION['verified_email'] = $normalizedEmail;
                            $_SESSION['registration_token'] = $regToken;
                            $_SESSION['verified_time'] = time();

                            $response['success'] = true;
                            $response['message'] = 'Email verified successfully!';
                            $response['registration_token'] = $regToken;
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
    } elseif ($action === 'register') {
        $full_name = isset($_POST['full_name']) ? cleanInput($_POST['full_name']) : '';
        $mobile = isset($_POST['mobile']) ? cleanInput($_POST['mobile']) : '';
        $email = isset($_POST['email']) ? cleanInput($_POST['email']) : '';
        $board = isset($_POST['board']) ? cleanInput($_POST['board']) : '';
        $class = isset($_POST['class']) ? cleanInput($_POST['class']) : '';
        $password = isset($_POST['password']) ? $_POST['password'] : '';
        $registration_token = isset($_POST['registration_token']) ? cleanInput($_POST['registration_token']) : (isset($_SESSION['registration_token']) ? $_SESSION['registration_token'] : '');
        $normalizedEmail = strtolower($email);

        // Session verification checks
        $sessionVerified = isset($_SESSION['email_verified']) && $_SESSION['email_verified'] === true && isset($_SESSION['verified_email']) && $_SESSION['verified_email'] === $normalizedEmail;
        $sessionNotExpired = isset($_SESSION['verified_time']) && (time() - $_SESSION['verified_time']) <= 900; // 15 min window

        if (!$sessionVerified || !$sessionNotExpired || empty($registration_token)) {
            $response['message'] = 'Please verify your email with OTP first or your verification session has expired.';
            ob_clean();
            header('Content-Type: application/json');
            echo json_encode($response);
            exit;
        }

        $errors = [];

        if (empty($full_name)) {
            $errors[] = 'Full name is required';
        } elseif (strlen($full_name) < 3) {
            $errors[] = 'Full name must be at least 3 characters';
        }

        if (empty($mobile)) {
            $errors[] = 'Mobile number is required';
        } elseif (!preg_match('/^[0-9]{10}$/', $mobile)) {
            $errors[] = 'Invalid mobile number';
        }

        if (empty($board)) {
            $errors[] = 'Board selection is required';
        }

        if (empty($class)) {
            $errors[] = 'Class selection is required';
        }

        // P0-7: Password policy enforcement
        $pwdCheck = validatePasswordPolicy($password);
        if (!$pwdCheck['valid']) {
            $errors[] = $pwdCheck['message'];
        }

        if (empty($errors)) {
            try {
                $conn->beginTransaction();

                // DB verification check
                $current_time = date('Y-m-d H:i:s');
                $tokenStmt = $conn->prepare("SELECT * FROM otp_logs WHERE email = ? AND expiry_time > ? ORDER BY id DESC LIMIT 1");
                $tokenStmt->execute([$normalizedEmail, $current_time]);
                $tokenRecord = $tokenStmt->fetch(PDO::FETCH_ASSOC);

                if (!$tokenRecord) {
                    throw new Exception('Email verification session expired. Please verify OTP again.');
                }

                if (!empty($tokenRecord['verified_token'])) {
                    if (!hash_equals($tokenRecord['verified_token'], hashToken($registration_token))) {
                        throw new Exception('Invalid registration authorization token. Please verify OTP again.');
                    }
                }

                // Check if already registered
                $checkUser = $conn->prepare("SELECT id FROM students WHERE email = ?");
                $checkUser->execute([$normalizedEmail]);
                if ($checkUser->fetch()) {
                    throw new Exception('Email is already registered. Please login.');
                }

                $hashed_password = password_hash($password, PASSWORD_DEFAULT);

                $stmt = $conn->prepare("INSERT INTO students (full_name, mobile, email, board, class, password, is_verified) VALUES (?, ?, ?, ?, ?, ?, 1)");
                $stmt->execute([$full_name, $mobile, $normalizedEmail, $board, $class, $hashed_password]);

                // Delete verified token record to prevent replay
                $stmt = $conn->prepare("DELETE FROM otp_logs WHERE email = ?");
                $stmt->execute([$normalizedEmail]);

                $conn->commit();

                // Clean up session and regenerate ID
                unset($_SESSION['email_verified'], $_SESSION['verified_email'], $_SESSION['registration_token'], $_SESSION['verified_time'], $_SESSION['otp_email'], $_SESSION['otp_sent_time']);
                session_regenerate_id(true);

                $response['success'] = true;
                $response['message'] = 'Registration successful! Please login to continue.';
                $response['redirect'] = BASE_URL . '/login.php';
            } catch (Exception $e) {
                $conn->rollBack();
                $response['message'] = $e->getMessage();
                error_log("Registration error: " . $e->getMessage());
            }
        } else {
            $response['message'] = implode(', ', $errors);
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
    .l360-enroll-container {
        max-width: 1280px;
        margin: 0 auto;
        padding: 40px 20px;
    }

    .l360-enroll-wrapper {
        display: grid;
        grid-template-columns: 1fr 1.2fr;
        gap: 40px;
    }

    .l360-enroll-info {
        background: var(--l360-white);
        border-radius: 5px;
        border: 1px solid var(--l360-gray-light);
        padding: 30px;
    }

    .l360-enroll-info h2 {
        color: var(--l360-dark);
        font-size: 22px;
        font-weight: 600;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 2px solid var(--l360-accent);
        display: inline-block;
    }

    .l360-feature-list {
        list-style: none;
        padding: 0;
        margin-top: 25px;
    }

    .l360-feature-list li {
        padding: 12px 0;
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 14px;
        color: var(--l360-gray);
        border-bottom: 1px solid var(--l360-gray-light);
    }

    .l360-feature-list li:last-child {
        border-bottom: none;
    }

    .l360-feature-list li img {
        width: 22px;
        height: 22px;
    }

    .l360-feature-list li span {
        font-weight: 600;
        color: var(--l360-accent);
    }

    .l360-enroll-form {
        background: var(--l360-white);
        border-radius: 5px;
        border: 1px solid var(--l360-gray-light);
        padding: 30px;
    }

    .l360-enroll-form h2 {
        color: var(--l360-dark);
        font-size: 22px;
        font-weight: 600;
        margin-bottom: 10px;
    }

    .l360-form-subtitle {
        font-size: 13px;
        color: var(--l360-gray);
        margin-bottom: 25px;
        padding-bottom: 15px;
        border-bottom: 1px solid var(--l360-gray-light);
    }

    .l360-form-group {
        margin-bottom: 20px;
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

    .l360-form-group input,
    .l360-form-group select,
    .l360-form-group textarea {
        width: 100%;
        padding: 10px 12px;
        border: 1px solid var(--l360-gray-light);
        border-radius: 4px;
        font-size: 14px;
        transition: var(--l360-transition);
        background: var(--l360-white);
    }

    .l360-form-group input.error-input,
    .l360-form-group select.error-input {
        border-color: var(--l360-accent);
        background-color: #fff0f0;
    }

    .l360-form-group input:focus,
    .l360-form-group select:focus,
    .l360-form-group textarea:focus {
        outline: none;
        border-color: var(--l360-accent);
        box-shadow: 0 0 0 2px rgba(196, 1, 56, 0.1);
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
        padding: 10px 16px;
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

    .l360-form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
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
        margin-top: 20px;
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

    @media (max-width: 992px) {
        .l360-enroll-wrapper {
            grid-template-columns: 1fr;
            gap: 30px;
        }
    }

    @media (max-width: 768px) {
        .l360-enroll-container {
            padding: 30px 15px;
        }

        .l360-enroll-info,
        .l360-enroll-form {
            padding: 20px;
        }

        .l360-enroll-info h2,
        .l360-enroll-form h2 {
            font-size: 20px;
        }

        .l360-form-row {
            grid-template-columns: 1fr;
            gap: 15px;
        }

        .l360-email-wrapper {
            flex-direction: column;
        }

        .l360-otp-btn {
            width: 100%;
        }
    }
</style>

<div class="l360-enroll-container">
    <div class="l360-enroll-wrapper">
        <div class="l360-enroll-info">
            <h2>Why Enroll With AARAMBH INSTITUTE?</h2>
            <ul class="l360-feature-list">
                <li>
                    <img src="<?php echo BASE_URL ?>/assets/images/icons/check-circle.png" alt="Check">
                    <span>Complete LMS Access</span> - Study anytime, anywhere
                </li>
                <li>
                    <img src="<?php echo BASE_URL ?>/assets/images/icons/check-circle.png" alt="Check">
                    <span>Live Interactive Classes</span> - Learn from expert faculty
                </li>
                <li>
                    <img src="<?php echo BASE_URL ?>/assets/images/icons/check-circle.png" alt="Check">
                    <span>Downloadable Study Materials</span> - Chapter-wise notes & guides
                </li>
                <li>
                    <img src="<?php echo BASE_URL ?>/assets/images/icons/check-circle.png" alt="Check">
                    <span>Practice Tests & Mock Exams</span> - Track your progress
                </li>
                <li>
                    <img src="<?php echo BASE_URL ?>/assets/images/icons/check-circle.png" alt="Check">
                    <span>24/7 Doubt Clearing</span> - Get your questions answered
                </li>
                <li>
                    <img src="<?php echo BASE_URL ?>/assets/images/icons/check-circle.png" alt="Check">
                    <span>Recorded Video Lectures</span> - Revise anytime
                </li>
                <li>
                    <img src="<?php echo BASE_URL ?>/assets/images/icons/check-circle.png" alt="Check">
                    <span>Assignment Support</span> - Guidance for TMA submission
                </li>
                <li>
                    <img src="<?php echo BASE_URL ?>/assets/images/icons/check-circle.png" alt="Check">
                    <span>Exam Preparation Tips</span> - Strategies to score high
                </li>
            </ul>
        </div>

        <div class="l360-enroll-form">
            <h2>Student Registration Form</h2>
            <div class="l360-form-subtitle">Fill the details below to create your LMS account</div>

            <form id="registrationForm">
                <input type="hidden" name="csrf_token" id="csrf_token" value="<?php echo htmlspecialchars($_SESSION['csrf_token'], ENT_QUOTES, 'UTF-8'); ?>">
                <div class="l360-form-row">
                    <div class="l360-form-group" id="fullNameGroup">
                        <label>Full Name <span>*</span></label>
                        <input type="text" name="full_name" id="full_name" placeholder="Enter your full name">
                        <span class="error-message" id="fullNameError"></span>
                    </div>
                    <div class="l360-form-group" id="mobileGroup">
                        <label>Mobile Number <span>*</span></label>
                        <input type="tel" name="mobile" id="mobile" placeholder="10-digit mobile number">
                        <span class="error-message" id="mobileError"></span>
                    </div>
                </div>

                <div class="l360-form-row">
                    <div class="l360-form-group" id="emailGroup">
                        <label>Email Address <span>*</span></label>
                        <div class="l360-email-wrapper">
                            <input type="email" name="email" id="email" placeholder="Enter your email">
                            <button type="button" class="l360-otp-btn" id="sendOtpBtn">Send OTP</button>
                        </div>
                        <span class="l360-otp-status" id="emailStatus"></span>
                        <span class="error-message" id="emailError"></span>
                    </div>
                    <div class="l360-form-group" id="otpGroup">
                        <label>OTP <span>*</span></label>
                        <input type="text" name="otp" id="otp" placeholder="Enter OTP">
                        <button type="button" class="l360-otp-btn" id="verifyOtpBtn" style="margin-top: 10px; width: 100%;">Verify OTP</button>
                        <span class="error-message" id="otpError"></span>
                    </div>
                </div>

                <div class="l360-form-row">
                    <div class="l360-form-group" id="boardGroup">
                        <label>Select Board <span>*</span></label>
                        <select name="board" id="board">
                            <option value="">Select Board</option>
                            <option value="nios">NIOS Board</option>
                            <option value="bbose">BBOSE Board</option>
                            <option value="bosse">BOSSE Board</option>
                        </select>
                        <span class="error-message" id="boardError"></span>
                    </div>
                    <div class="l360-form-group" id="classGroup">
                        <label>Select Class <span>*</span></label>
                        <select name="class" id="class">
                            <option value="">Select Class</option>
                            <option value="10th">10th (Secondary)</option>
                            <option value="12th">12th (Senior Secondary)</option>
                        </select>
                        <span class="error-message" id="classError"></span>
                    </div>
                </div>

                <div class="l360-form-row">
                    <div class="l360-form-group" id="passwordGroup">
                        <label>Create Password <span>*</span></label>
                        <input type="password" name="password" id="password" placeholder="Create a password">
                        <span class="error-message" id="passwordError"></span>
                    </div>
                    <div class="l360-form-group" id="confirmPasswordGroup">
                        <label>Confirm Password <span>*</span></label>
                        <input type="password" name="confirm_password" id="confirm_password" placeholder="Confirm password">
                        <span class="error-message" id="confirmPasswordError"></span>
                    </div>
                </div>

                <button type="submit" class="l360-submit-btn" id="registerBtn">
                    <i class="fa-solid fa-user-plus"></i>
                    Register Now
                </button>

                <div class="l360-login-link">
                    Already have an account? <a href="<?php echo BASE_URL ?>/login.php">Login to LMS</a>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
    let emailVerified = false;

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
            const inputInGroup = formGroup.querySelector('input, select');
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
            const inputInGroup = formGroup.querySelector('input, select');
            if (inputInGroup) {
                inputInGroup.classList.remove('error-input');
            }
        }
    }

    document.getElementById('full_name').addEventListener('input', function() {
        if (this.value.trim()) {
            clearFieldError('fullNameError', 'fullNameGroup');
        }
    });

    document.getElementById('mobile').addEventListener('input', function() {
        if (/^[0-9]{10}$/.test(this.value.trim())) {
            clearFieldError('mobileError', 'mobileGroup');
        }
    });

    document.getElementById('email').addEventListener('input', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(this.value.trim())) {
            clearFieldError('emailError', 'emailGroup');
            document.getElementById('emailStatus').textContent = '';
        }
    });

    document.getElementById('otp').addEventListener('input', function() {
        if (this.value.trim()) {
            clearFieldError('otpError', 'otpGroup');
        }
    });

    document.getElementById('board').addEventListener('change', function() {
        if (this.value) {
            clearFieldError('boardError', 'boardGroup');
        }
    });

    document.getElementById('class').addEventListener('change', function() {
        if (this.value) {
            clearFieldError('classError', 'classGroup');
        }
    });

    document.getElementById('password').addEventListener('input', function() {
        if (this.value.length >= 8) {
            clearFieldError('passwordError', 'passwordGroup');
        }
        const confirmPwd = document.getElementById('confirm_password');
        if (confirmPwd.value && confirmPwd.value === this.value) {
            clearFieldError('confirmPasswordError', 'confirmPasswordGroup');
        }
    });

    document.getElementById('confirm_password').addEventListener('input', function() {
        const password = document.getElementById('password').value;
        if (this.value === password && password.length >= 8) {
            clearFieldError('confirmPasswordError', 'confirmPasswordGroup');
        }
    });

    const csrfToken = "<?php echo htmlspecialchars($_SESSION['csrf_token'], ENT_QUOTES, 'UTF-8'); ?>";
    let registrationToken = '';
    let otpTimer = null;
    let otpCooldown = false;

    document.getElementById('sendOtpBtn').addEventListener('click', async function() {
        if (otpCooldown) {
            showToast('Please wait before requesting another OTP', 'error');
            return;
        }

        const email = document.getElementById('email').value.trim();
        const emailStatusSpan = document.getElementById('emailStatus');

        clearFieldError('emailError', 'emailGroup');

        if (!email) {
            showFieldError('emailError', 'Please enter email address first', 'emailGroup');
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
                emailStatusSpan.textContent = '✓ OTP sent successfully to ' + email;
                emailStatusSpan.className = 'l360-otp-status success';
                showToast('OTP sent successfully!', 'success');

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

    document.getElementById('verifyOtpBtn').addEventListener('click', async function() {
        const email = document.getElementById('email').value.trim();
        const otp = document.getElementById('otp').value.trim();
        const otpErrorSpan = document.getElementById('otpError');

        if (!email) {
            showFieldError('emailError', 'Please enter email first', 'emailGroup');
            return;
        }

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
                emailVerified = true;
                if (data.registration_token) {
                    registrationToken = data.registration_token;
                }
                otpErrorSpan.textContent = '';
                showToast('Email verified successfully!', 'success');
                document.getElementById('otp').disabled = true;
                this.disabled = true;
                this.textContent = '✓ Verified';
                document.getElementById('sendOtpBtn').disabled = true;
            } else {
                showFieldError('otpError', data.message, 'otpGroup');
                showToast(data.message, 'error');
                emailVerified = false;
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

    document.getElementById('registrationForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        if (!emailVerified) {
            showToast('Please verify your email with OTP first', 'error');
            return;
        }

        clearAllErrors();

        const fullName = document.getElementById('full_name').value.trim();
        const mobile = document.getElementById('mobile').value.trim();
        const email = document.getElementById('email').value.trim();
        const otp = document.getElementById('otp').value.trim();
        const board = document.getElementById('board').value;
        const classVal = document.getElementById('class').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm_password').value;

        let isValid = true;

        if (!fullName) {
            showFieldError('fullNameError', 'Full name is required', 'fullNameGroup');
            isValid = false;
        } else if (fullName.length < 3) {
            showFieldError('fullNameError', 'Full name must be at least 3 characters', 'fullNameGroup');
            isValid = false;
        }

        if (!mobile) {
            showFieldError('mobileError', 'Mobile number is required', 'mobileGroup');
            isValid = false;
        } else if (!/^[0-9]{10}$/.test(mobile)) {
            showFieldError('mobileError', 'Please enter a valid 10-digit mobile number', 'mobileGroup');
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            showFieldError('emailError', 'Email address is required', 'emailGroup');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showFieldError('emailError', 'Please enter a valid email address', 'emailGroup');
            isValid = false;
        }

        if (!otp) {
            showFieldError('otpError', 'OTP is required', 'otpGroup');
            isValid = false;
        }

        if (!board) {
            showFieldError('boardError', 'Please select your board', 'boardGroup');
            isValid = false;
        }

        if (!classVal) {
            showFieldError('classError', 'Please select your class', 'classGroup');
            isValid = false;
        }

        if (!password) {
            showFieldError('passwordError', 'Password is required', 'passwordGroup');
            isValid = false;
        } else if (password.length < 8) {
            showFieldError('passwordError', 'Password must be at least 8 characters', 'passwordGroup');
            isValid = false;
        } else if (password.length > 128) {
            showFieldError('passwordError', 'Password cannot exceed 128 characters', 'passwordGroup');
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
            const submitBtn = document.getElementById('registerBtn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loading-spinner"></span> Registering...';
            submitBtn.disabled = true;

            try {
                const formData = new FormData();
                formData.append('action', 'register');
                formData.append('csrf_token', csrfToken);
                formData.append('registration_token', registrationToken);
                formData.append('full_name', fullName);
                formData.append('mobile', mobile);
                formData.append('email', email);
                formData.append('otp', otp);
                formData.append('board', board);
                formData.append('class', classVal);
                formData.append('password', password);

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
                showToast('Registration failed. Please try again.', 'error');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }
    });
</script>

<?php
require_once __DIR__ . '/includes/footer.php';
?>
