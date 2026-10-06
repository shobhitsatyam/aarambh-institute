<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);

$isSecure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == 443);

if (session_status() === PHP_SESSION_NONE) {
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

require_once dirname(__DIR__) . '/auth_secrets.php';
require_once __DIR__ . '/base-path.php';
require_once __DIR__ . '/config/connection.php';

if (isset($_SESSION['student_id'])) {
    header('Location: ' . BASE_URL . '/dashboard/dashboard.php');
    exit();
}

$database = new Database();
$conn = $database->getConnection();

$error_message = '';
$success_message = '';

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

function checkLoginRateLimit($conn, $identifier, $maxAttempts = 5, $decayMinutes = 15, $blockMinutes = 15)
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
                    'message' => "Too many failed login attempts. Please try again after {$remaining} minute(s)."
                ];
            }

            $decayTime = time() - ($decayMinutes * 60);
            $attempts = (int)$limit['attempts'];
            if (strtotime($limit['last_attempt']) < $decayTime || (!empty($limit['block_until']) && strtotime($limit['block_until']) <= time())) {
                $attempts = 0;
            }

            if ($attempts >= $maxAttempts) {
                $blockUntil = date('Y-m-d H:i:s', time() + ($blockMinutes * 60));
                $upd = $conn->prepare("UPDATE php_auth_rate_limits SET attempts = ?, last_attempt = ?, block_until = ? WHERE identifier = ?");
                $upd->execute([$attempts, $now, $blockUntil, $identifier]);
                return [
                    'allowed' => false,
                    'message' => "Too many failed login attempts. Please try again after {$blockMinutes} minute(s)."
                ];
            }
        }
        return ['allowed' => true];
    } catch (PDOException $e) {
        error_log("Login rate limit check error: " . $e->getMessage());
        return [
            'allowed' => false,
            'message' => 'Unable to verify login security status. Please try again shortly.'
        ];
    }
}

function recordFailedLoginAttempt($conn, $identifier, $decayMinutes = 15, $blockMinutes = 15)
{
    $now = date('Y-m-d H:i:s');
    try {
        $stmt = $conn->prepare("SELECT attempts, last_attempt, block_until FROM php_auth_rate_limits WHERE identifier = ?");
        $stmt->execute([$identifier]);
        $limit = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($limit) {
            $decayTime = time() - ($decayMinutes * 60);
            $attempts = (int)$limit['attempts'] + 1;
            if (strtotime($limit['last_attempt']) < $decayTime || (!empty($limit['block_until']) && strtotime($limit['block_until']) <= time())) {
                $attempts = 1;
            }

            $blockUntil = null;
            if ($attempts >= 5) {
                $blockUntil = date('Y-m-d H:i:s', time() + ($blockMinutes * 60));
            }

            $upd = $conn->prepare("UPDATE php_auth_rate_limits SET attempts = ?, last_attempt = ?, block_until = ? WHERE identifier = ?");
            $upd->execute([$attempts, $now, $blockUntil, $identifier]);
        } else {
            $ins = $conn->prepare("INSERT INTO php_auth_rate_limits (identifier, attempts, last_attempt) VALUES (?, 1, ?)");
            $ins->execute([$identifier, $now]);
        }
    } catch (PDOException $e) {
        error_log("Record failed login error: " . $e->getMessage());
    }
}

function clearLoginRateLimit($conn, $identifier)
{
    try {
        $stmt = $conn->prepare("DELETE FROM php_auth_rate_limits WHERE identifier = ?");
        $stmt->execute([$identifier]);
    } catch (PDOException $e) {
        error_log("Clear rate limit error: " . $e->getMessage());
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawEmail = $_POST['email'] ?? '';
    $email = strtolower(trim($rawEmail));
    $password = $_POST['password'] ?? '';
    $remember_me = isset($_POST['remember_me']) ? true : false;
    $csrf_token = $_POST['csrf_token'] ?? '';

    if (empty($_SESSION['csrf_token']) || empty($csrf_token) || !hash_equals($_SESSION['csrf_token'], $csrf_token)) {
        $error_message = 'Invalid or expired security token. Please refresh the page and try again.';
    } elseif (empty($email) || empty($password)) {
        $error_message = 'Please enter both email and password';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error_message = 'Please enter a valid email address';
    } elseif (strlen($password) > 128) {
        $error_message = 'Password cannot exceed 128 characters';
    } else {
        $clientIP = getClientIP();

        $emailRate = checkLoginRateLimit($conn, "email:login:{$email}", 5, 15, 15);
        $ipRate = checkLoginRateLimit($conn, "ip:login:{$clientIP}", 20, 15, 15);

        if (!$emailRate['allowed']) {
            $error_message = $emailRate['message'];
        } elseif (!$ipRate['allowed']) {
            $error_message = $ipRate['message'];
        } else {
            try {
                $dummyHash = '$2y$10$e8w6yQzV0G9zE5jZ2Y9n9eW1fX8lM3qP7rS4tU6vW8xY0zA1bC2dE';

                $stmt = $conn->prepare("SELECT id, full_name, email, password, is_verified FROM students WHERE email = ?");
                $stmt->execute([$email]);
                $student = $stmt->fetch(PDO::FETCH_ASSOC);

                $hashToVerify = $student ? $student['password'] : $dummyHash;
                $passwordValid = password_verify($password, $hashToVerify);

                if ($student && $passwordValid) {
                    if ($student['is_verified'] == 0) {
                        $error_message = 'Please verify your email before logging in. Check your inbox for OTP.';
                    } else {
                        clearLoginRateLimit($conn, "email:login:{$email}");

                        session_regenerate_id(true);

                        $_SESSION['student_id'] = $student['id'];
                        $_SESSION['student_name'] = $student['full_name'];
                        $_SESSION['student_email'] = $student['email'];
                        $_SESSION['logged_in'] = true;

                        if ($remember_me) {
                            $token = bin2hex(random_bytes(32));
                            $expiry = date('Y-m-d H:i:s', strtotime('+30 days'));

                            $stmt = $conn->prepare("UPDATE students SET remember_token = ?, token_expiry = ? WHERE id = ?");
                            $stmt->execute([$token, $expiry, $student['id']]);

                            setcookie('remember_token', $token, [
                                'expires'  => time() + (86400 * 30),
                                'path'     => '/',
                                'domain'   => '',
                                'secure'   => $isSecure,
                                'httponly' => true,
                                'samesite' => 'Lax'
                            ]);
                        }

                        header('Location: ' . BASE_URL . '/dashboard/dashboard.php');
                        exit();
                    }
                } else {
                    recordFailedLoginAttempt($conn, "email:login:{$email}");
                    recordFailedLoginAttempt($conn, "ip:login:{$clientIP}");
                    $error_message = 'Invalid email or password';
                }
            } catch (PDOException $e) {
                error_log("Login error: " . $e->getMessage());
                $error_message = 'Server error occurred. Please try again.';
            }
        }
    }
}

require_once __DIR__ . '/includes/header.php';
?>

<style>
    .l360-login-container {
        max-width: 1280px;
        margin: 0 auto;
        padding: 40px 20px;
    }

    .l360-login-wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 40px;
        background: var(--l360-white);
        border-radius: 5px;
        border: 1px solid var(--l360-gray-light);
        overflow: hidden;
    }

    .l360-login-left {
        background: linear-gradient(135deg, var(--l360-dark) 0%, #1a1a2e 100%);
        padding: 50px 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        overflow: hidden;
    }

    .l360-login-left::before {
        content: '';
        position: absolute;
        top: -50%;
        right: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(196, 1, 56, 0.1) 0%, transparent 70%);
        animation: pulse 8s ease-in-out infinite;
    }

    @keyframes pulse {

        0%,
        100% {
            transform: scale(1);
            opacity: 0.5;
        }

        50% {
            transform: scale(1.1);
            opacity: 0.8;
        }
    }

    .l360-login-left-content {
        position: relative;
        z-index: 1;
    }

    .l360-login-left h2 {
        color: var(--l360-white);
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 20px;
    }

    .l360-login-left p {
        color: rgba(255, 255, 255, 0.9);
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 30px;
    }

    .l360-feature-list-login {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .l360-feature-list-login li {
        padding: 12px 0;
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.9);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .l360-feature-list-login li:last-child {
        border-bottom: none;
    }

    .l360-feature-list-login li i {
        color: var(--l360-accent);
        font-size: 18px;
        width: 24px;
    }

    .l360-login-right {
        padding: 50px 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .l360-login-header {
        margin-bottom: 30px;
    }

    .l360-login-header h2 {
        color: var(--l360-dark);
        font-size: 22px;
        font-weight: 600;
        margin-bottom: 10px;
    }

    .l360-login-header p {
        color: var(--l360-gray);
        font-size: 14px;
    }

    .alert-message {
        padding: 12px 15px;
        border-radius: 4px;
        margin-bottom: 20px;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .alert-error {
        background-color: #fee;
        border: 1px solid #fcc;
        color: var(--l360-accent);
    }

    .alert-success {
        background-color: #e8f5e9;
        border: 1px solid #c8e6c9;
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

    .error-message {
        font-size: 12px;
        color: var(--l360-accent);
        margin-top: 5px;
        display: block;
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

    .l360-form-options {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 25px;
        font-size: 13px;
    }

    .l360-remember-me {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
    }

    .l360-remember-me input {
        width: auto;
        cursor: pointer;
    }

    .l360-forgot-link {
        color: var(--l360-accent);
        text-decoration: none;
        font-weight: 600;
    }

    .l360-forgot-link:hover {
        text-decoration: underline;
    }

    .l360-login-btn {
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

    .l360-login-btn:hover:not(:disabled) {
        background: #a0012e;
        transform: translateY(-2px);
    }

    .l360-login-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .l360-register-link {
        text-align: center;
        margin-top: 25px;
        padding-top: 25px;
        border-top: 1px solid var(--l360-gray-light);
        font-size: 13px;
        color: var(--l360-gray);
    }

    .l360-register-link a {
        color: var(--l360-accent);
        text-decoration: none;
        font-weight: 600;
    }

    .l360-register-link a:hover {
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

    @media (max-width: 992px) {
        .l360-login-wrapper {
            grid-template-columns: 1fr;
        }

        .l360-login-left {
            padding: 40px 30px;
        }

        .l360-login-left h2 {
            font-size: 20px;
        }
    }

    @media (max-width: 768px) {
        .l360-login-container {
            padding: 30px 15px;
        }

        .l360-login-left,
        .l360-login-right {
            padding: 30px 20px;
        }

        .l360-login-header h2 {
            font-size: 20px;
        }

        .l360-form-options {
            flex-direction: column;
            gap: 15px;
            align-items: flex-start;
        }
    }
</style>

<div class="l360-login-container">
    <div class="l360-login-wrapper">
        <div class="l360-login-left">
            <div class="l360-login-left-content">
                <h2>Welcome to LMS Portal</h2>
                <p>Access your learning materials, track progress, and continue your educational journey with us.</p>
                <ul class="l360-feature-list-login">
                    <li>
                        <i class="fa-solid fa-graduation-cap"></i>
                        <span>Access to complete study materials</span>
                    </li>
                    <li>
                        <i class="fa-solid fa-chalkboard-user"></i>
                        <span>Live interactive classes</span>
                    </li>
                    <li>
                        <i class="fa-solid fa-file-alt"></i>
                        <span>Downloadable notes & assignments</span>
                    </li>
                    <li>
                        <i class="fa-solid fa-chart-line"></i>
                        <span>Track your progress with tests</span>
                    </li>
                    <li>
                        <i class="fa-solid fa-headset"></i>
                        <span>24/7 doubt clearing support</span>
                    </li>
                </ul>
            </div>
        </div>

        <div class="l360-login-right">
            <div class="l360-login-header">
                <h2>Login to Your Account</h2>
                <p>Enter your credentials to access your dashboard</p>
            </div>

            <?php if ($error_message): ?>
                <div class="alert-message alert-error">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <?php echo htmlspecialchars($error_message); ?>
                </div>
            <?php endif; ?>

            <?php if ($success_message): ?>
                <div class="alert-message alert-success">
                    <i class="fa-solid fa-circle-check"></i>
                    <?php echo htmlspecialchars($success_message); ?>
                </div>
            <?php endif; ?>

            <form action="" method="POST" id="loginForm">
                <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($_SESSION['csrf_token'], ENT_QUOTES, 'UTF-8'); ?>">
                <div class="l360-form-group" id="emailGroup">
                    <label>Email Address <span>*</span></label>
                    <input type="email" name="email" id="email" placeholder="Enter your registered email" value="<?php echo htmlspecialchars($_POST['email'] ?? ''); ?>">
                    <span class="error-message" id="emailError"></span>
                </div>

                <div class="l360-form-group" id="passwordGroup">
                    <label>Password <span>*</span></label>
                    <div class="l360-password-wrapper">
                        <input type="password" name="password" id="password" placeholder="Enter your password">
                        <button type="button" class="l360-password-toggle" id="togglePassword">
                            <i class="fa-regular fa-eye"></i>
                        </button>
                    </div>
                    <span class="error-message" id="passwordError"></span>
                </div>

                <div class="l360-form-options">
                    <label class="l360-remember-me">
                        <input type="checkbox" name="remember_me" id="remember_me">
                        Remember Me
                    </label>
                    <a href="forgot-password.php" class="l360-forgot-link">Forgot Password?</a>
                </div>

                <button type="submit" class="l360-login-btn" id="loginBtn">
                    <i class="fa-solid fa-arrow-right-to-bracket"></i>
                    Login
                </button>

                <div class="l360-register-link">
                    Don't have an account? <a href="<?php echo BASE_URL ?>/register.php">Register Now</a>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
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

    document.getElementById('email').addEventListener('input', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(this.value.trim())) {
            clearFieldError('emailError', 'emailGroup');
        }
    });

    document.getElementById('password').addEventListener('input', function() {
        if (this.value.trim()) {
            clearFieldError('passwordError', 'passwordGroup');
        }
    });

    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.innerHTML = type === 'password' ? '<i class="fa-regular fa-eye"></i>' : '<i class="fa-regular fa-eye-slash"></i>';
    });

    const loginForm = document.getElementById('loginForm');
    const loginBtn = document.getElementById('loginBtn');

    loginForm.addEventListener('submit', function(e) {
        clearAllErrors();

        let isValid = true;
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            showFieldError('emailError', 'Email address is required', 'emailGroup');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showFieldError('emailError', 'Please enter a valid email address', 'emailGroup');
            isValid = false;
        }

        if (!password) {
            showFieldError('passwordError', 'Password is required', 'passwordGroup');
            isValid = false;
        } else if (password.length > 128) {
            showFieldError('passwordError', 'Password cannot exceed 128 characters', 'passwordGroup');
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault();
        } else {
            loginBtn.innerHTML = '<span class="loading-spinner"></span> Logging in...';
            loginBtn.disabled = true;
        }
    });

    const rememberedEmail = localStorage.getItem('lms_remembered_email');
    if (rememberedEmail) {
        document.getElementById('email').value = rememberedEmail;
        document.getElementById('remember_me').checked = true;
    }

    document.getElementById('remember_me').addEventListener('change', function() {
        if (this.checked) {
            localStorage.setItem('lms_remembered_email', document.getElementById('email').value);
        } else {
            localStorage.removeItem('lms_remembered_email');
        }
    });
</script>

<?php
require_once __DIR__ . '/includes/footer.php';
?>
