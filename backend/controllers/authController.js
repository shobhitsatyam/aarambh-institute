const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const db = require('../config/db');
const emailService = require('../utils/emailService');

// ==========================================
// SECURITY HELPERS & UTILITIES
// ==========================================

// P0-3: Cryptographically secure 6-digit OTP generation using crypto.randomInt
const generateOTP = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

// P0-4: One-way HMAC-SHA256 hash for OTP storage
const getOtpSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is missing.');
  }
  return process.env.JWT_SECRET;
};

const hashOTP = (email, otp) => {
  const secret = getOtpSecret();
  const normalizedEmail = (email || '').toLowerCase().trim();
  return crypto.createHmac('sha256', secret).update(`${normalizedEmail}:${otp}`).digest('hex');
};

const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

// Constant-time string comparison to prevent timing attacks
const safeTimingCompare = (a, b) => {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const bufA = Buffer.from(a, 'utf8');
  const bufB = Buffer.from(b, 'utf8');
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
};

// P0-7: Password policy validator
const validatePasswordPolicy = (password) => {
  if (typeof password !== 'string') {
    return { valid: false, message: 'Password must be a valid text string.' };
  }
  if (!password || password.trim().length === 0) {
    return { valid: false, message: 'Password cannot be empty or whitespace only.' };
  }
  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters long.' };
  }
  if (password.length > 128) {
    return { valid: false, message: 'Password cannot exceed 128 characters.' };
  }
  return { valid: true };
};

// Helper: safe insert for OTP (fails closed if DB schema cannot store cryptographic hash)
const storeOTP = async (email, otp, expiresAt, type) => {
  const hashedOtp = hashOTP(email, otp);
  try {
    // Try schema with attempts column
    await db.query(
      'INSERT INTO otps (email, otp, attempts, expires_at, type) VALUES (?, ?, 0, ?, ?)',
      [email, hashedOtp, expiresAt, type]
    );
  } catch (err) {
    if (err.code === 'ER_BAD_FIELD_ERROR') {
      try {
        await db.query(
          'INSERT INTO otps (email, otp, expires_at, type) VALUES (?, ?, ?, ?)',
          [email, hashedOtp, expiresAt, type]
        );
      } catch (err2) {
        if (err2.code === 'ER_DATA_TOO_LONG') {
          console.error('[SECURITY ERROR] Cannot store OTP: otps.otp column is too short to store cryptographic hash. Database migration 001_auth_otp_security.sql is required.');
          const migrationErr = new Error('Authentication service configuration error: database migration required.');
          migrationErr.isMigrationError = true;
          throw migrationErr;
        }
        throw err2;
      }
    } else if (err.code === 'ER_DATA_TOO_LONG') {
      console.error('[SECURITY ERROR] Cannot store OTP: otps.otp column is too short to store cryptographic hash. Database migration 001_auth_otp_security.sql is required.');
      const migrationErr = new Error('Authentication service configuration error: database migration required.');
      migrationErr.isMigrationError = true;
      throw migrationErr;
    } else {
      throw err;
    }
  }
};

// Helper: safe insert for verified session tokens (fails closed if DB schema cannot store full token hash)
const storeVerifiedToken = async (email, tokenHash, expiresAt, type) => {
  try {
    await db.query(
      'INSERT INTO otps (email, otp, attempts, expires_at, type) VALUES (?, ?, 0, ?, ?)',
      [email, tokenHash, expiresAt, type]
    );
  } catch (err) {
    if (err.code === 'ER_BAD_FIELD_ERROR') {
      try {
        await db.query(
          'INSERT INTO otps (email, otp, expires_at, type) VALUES (?, ?, ?, ?)',
          [email, tokenHash, expiresAt, type]
        );
      } catch (err2) {
        if (err2.code === 'ER_DATA_TOO_LONG') {
          console.error('[SECURITY ERROR] Cannot store verification token: otps.otp column is too short. Database migration 001_auth_otp_security.sql is required.');
          const migrationErr = new Error('Authentication service configuration error: database migration required.');
          migrationErr.isMigrationError = true;
          throw migrationErr;
        }
        throw err2;
      }
    } else if (err.code === 'ER_DATA_TOO_LONG') {
      console.error('[SECURITY ERROR] Cannot store verification token: otps.otp column is too short. Database migration 001_auth_otp_security.sql is required.');
      const migrationErr = new Error('Authentication service configuration error: database migration required.');
      migrationErr.isMigrationError = true;
      throw migrationErr;
    } else {
      throw err;
    }
  }
};

// ==========================================
// RATE LIMITING HELPERS (DB-BACKED)
// ==========================================

// P0-5 & P0-6: Cooldown & Rate Limiting for OTP generation
const checkOtpRateLimit = async (email, flowType = 'otp') => {
  const normalized = (email || '').toLowerCase().trim();
  const rawKey = `otp:${flowType}:${normalized}`;
  const key = rawKey.length > 90
    ? `otp:${flowType}:` + crypto.createHash('sha256').update(normalized).digest('hex').substring(0, 32)
    : rawKey;

  const now = new Date();
  const [limits] = await db.query('SELECT * FROM otp_rate_limits WHERE email = ?', [key]);

  if (limits.length > 0) {
    const limitInfo = limits[0];

    // Check if currently blocked
    if (limitInfo.block_until && new Date(limitInfo.block_until) > now) {
      const minutesRemaining = Math.max(1, Math.ceil((new Date(limitInfo.block_until) - now) / 60000));
      return { allowed: false, message: `Too many OTP requests. Please try again after ${minutesRemaining} minute(s).` };
    }

    // 60-second cooldown between requests
    const secondsSinceLast = (now.getTime() - new Date(limitInfo.last_attempt).getTime()) / 1000;
    if (secondsSinceLast < 60) {
      const waitSeconds = Math.ceil(60 - secondsSinceLast);
      return { allowed: false, message: `Please wait ${waitSeconds} second(s) before requesting another OTP.` };
    }

    // Reset if last attempt was more than 1 hour ago
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    let newAttempts = limitInfo.attempts + 1;
    if (new Date(limitInfo.last_attempt) < oneHourAgo) {
      newAttempts = 1;
    }

    // Limit to 5 requests per hour
    if (newAttempts > 5) {
      const blockUntil = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour lockout
      await db.query(
        'UPDATE otp_rate_limits SET attempts = ?, last_attempt = ?, block_until = ? WHERE email = ?',
        [newAttempts, now, blockUntil, key]
      );
      return { allowed: false, message: 'Too many OTP requests. Please try again after 1 hour.' };
    } else {
      await db.query(
        'UPDATE otp_rate_limits SET attempts = ?, last_attempt = ?, block_until = NULL WHERE email = ?',
        [newAttempts, now, key]
      );
      return { allowed: true };
    }
  } else {
    await db.query(
      'INSERT INTO otp_rate_limits (email, attempts, last_attempt) VALUES (?, 1, ?)',
      [key, now]
    );
    return { allowed: true };
  }
};

// P0-6: Login Rate Limiting (5 failed attempts -> 15 min lockout)
const getLoginRateLimitKey = (email) => {
  const normalized = (email || '').toLowerCase().trim();
  if (normalized.length > 80) {
    return 'lgn:' + crypto.createHash('sha256').update(normalized).digest('hex');
  }
  return `lgn:${normalized}`;
};

const checkLoginRateLimit = async (email) => {
  const key = getLoginRateLimitKey(email);
  const now = new Date();
  const [rows] = await db.query('SELECT * FROM otp_rate_limits WHERE email = ?', [key]);

  if (rows.length > 0) {
    const record = rows[0];
    if (record.block_until && new Date(record.block_until) > now) {
      const minutesRemaining = Math.max(1, Math.ceil((new Date(record.block_until) - now) / 60000));
      return {
        allowed: false,
        message: `Too many failed login attempts. Account temporarily locked. Please try again after ${minutesRemaining} minute(s).`
      };
    }
  }
  return { allowed: true };
};

const recordFailedLogin = async (email) => {
  const key = getLoginRateLimitKey(email);
  const now = new Date();
  const [rows] = await db.query('SELECT * FROM otp_rate_limits WHERE email = ?', [key]);

  if (rows.length > 0) {
    const record = rows[0];
    const fifteenMinutesAgo = new Date(now.getTime() - 15 * 60000);
    let attempts = record.attempts + 1;

    // Reset attempts if previous attempt was outside the rolling window
    if (new Date(record.last_attempt) < fifteenMinutesAgo || (record.block_until && new Date(record.block_until) <= now)) {
      attempts = 1;
    }

    if (attempts >= 5) {
      const blockUntil = new Date(now.getTime() + 15 * 60000); // 15 min block
      await db.query(
        'UPDATE otp_rate_limits SET attempts = ?, last_attempt = ?, block_until = ? WHERE email = ?',
        [attempts, now, blockUntil, key]
      );
    } else {
      await db.query(
        'UPDATE otp_rate_limits SET attempts = ?, last_attempt = ?, block_until = NULL WHERE email = ?',
        [attempts, now, key]
      );
    }
  } else {
    await db.query(
      'INSERT INTO otp_rate_limits (email, attempts, last_attempt) VALUES (?, 1, ?)',
      [key, now]
    );
  }
};

const resetLoginRateLimit = async (email) => {
  const key = getLoginRateLimitKey(email);
  await db.query('DELETE FROM otp_rate_limits WHERE email = ?', [key]);
};

// P0-5: OTP verification attempt limiter and validator
const verifyOtpAttempt = async (email, otpInput, flowType) => {
  const [records] = await db.query(
    'SELECT * FROM otps WHERE email = ? AND type = ? AND expires_at > NOW() ORDER BY id DESC LIMIT 1',
    [email, flowType]
  );

  if (records.length === 0) {
    return { success: false, message: 'Invalid or expired OTP. Please request a new one.' };
  }

  const record = records[0];
  const currentAttempts = typeof record.attempts === 'number' ? record.attempts : 0;

  // Max 5 attempts
  if (currentAttempts >= 5) {
    await db.query('DELETE FROM otps WHERE id = ?', [record.id]);
    return { success: false, message: 'Maximum verification attempts exceeded. Please request a new OTP.' };
  }

  // Enforce secure storage: stored OTP must be a valid 64-character cryptographic hash
  if (!record.otp || record.otp.length !== 64) {
    console.error('[SECURITY ERROR] Insecure or invalid OTP record found in database. Rejecting verification.');
    await db.query('DELETE FROM otps WHERE id = ?', [record.id]);
    return { success: false, message: 'Invalid or expired OTP. Please request a new one.' };
  }

  const expectedHash = hashOTP(email, otpInput);
  const isMatch = safeTimingCompare(expectedHash, record.otp);

  if (!isMatch) {
    const newAttempts = currentAttempts + 1;
    try {
      await db.query('UPDATE otps SET attempts = ? WHERE id = ?', [newAttempts, record.id]);
    } catch (e) {
      // attempts column might not exist on unmigrated DB
    }

    const remaining = 5 - newAttempts;
    if (remaining <= 0) {
      await db.query('DELETE FROM otps WHERE id = ?', [record.id]);
      return { success: false, message: 'Incorrect OTP. Maximum attempts exceeded. Please request a new OTP.' };
    }
    return { success: false, message: `Incorrect OTP. ${remaining} attempt(s) remaining.` };
  }

  // OTP verified successfully -> single-use: delete raw OTP record
  await db.query('DELETE FROM otps WHERE id = ?', [record.id]);
  return { success: true };
};

// ==========================================
// REGISTRATION FLOW
// ==========================================

exports.sendRegisterOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required' });
    }
    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const [existingUsers] = await db.query('SELECT id FROM users WHERE email = ?', [normalizedEmail]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ success: false, message: 'Email is already registered' });
    }

    // Rate Limit Check & 60s cooldown
    const rateCheck = await checkOtpRateLimit(normalizedEmail, 'register');
    if (!rateCheck.allowed) {
      return res.status(429).json({ success: false, message: rateCheck.message });
    }

    // Clean up previous pending register OTPs for this email
    await db.query('DELETE FROM otps WHERE email = ? AND type = ?', [normalizedEmail, 'register']);

    // P0-3: Secure OTP generation
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60000); // 10 minutes from now

    // Send OTP via Email
    await emailService.sendOTP(normalizedEmail, otp, 'register');

    // P0-4: Store hashed OTP in database
    await storeOTP(normalizedEmail, otp, expiresAt, 'register');

    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending registration OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
};

exports.verifyRegisterOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email and OTP are required' });
    }
    const normalizedEmail = email.toLowerCase().trim();

    // Verify OTP with attempt limits and expiry check
    const result = await verifyOtpAttempt(normalizedEmail, otp.trim(), 'register');
    if (!result.success) {
      return res.status(400).json({ success: false, message: result.message });
    }

    // Clean up any stale register_verified records for this email
    await db.query('DELETE FROM otps WHERE email = ? AND type = ?', [normalizedEmail, 'register_verified']);

    // Generate cryptographically secure registration authorization token
    const registrationToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = hashToken(registrationToken);
    const expiresAt = new Date(Date.now() + 15 * 60000); // 15-minute registration window

    await storeVerifiedToken(normalizedEmail, tokenHash, expiresAt, 'register_verified');

    res.json({
      success: true,
      message: 'Email verified successfully! You can now register.',
      registrationToken
    });
  } catch (error) {
    console.error('Error verifying registration OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to verify OTP' });
  }
};

exports.register = async (req, res) => {
  try {
    const { full_name, mobile, email, board, class: studentClass, password, registrationToken } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }
    const normalizedEmail = email.toLowerCase().trim();

    // P0-7: Password policy enforcement
    const pwdCheck = validatePasswordPolicy(password);
    if (!pwdCheck.valid) {
      return res.status(400).json({ success: false, message: pwdCheck.message });
    }

    // P0-1: Server-authoritative registration verification check
    const [verifiedRecords] = await db.query(
      'SELECT * FROM otps WHERE email = ? AND type = ? AND expires_at > NOW() ORDER BY id DESC LIMIT 1',
      [normalizedEmail, 'register_verified']
    );

    if (verifiedRecords.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Email verification required. Please verify your email with OTP first.'
      });
    }

    // P0-1: Server-authoritative registration verification token is strictly required
    if (!registrationToken) {
      return res.status(400).json({
        success: false,
        message: 'Registration session token is missing. Please verify your email with OTP first.'
      });
    }

    const clientHash = hashToken(registrationToken);
    if (!verifiedRecords[0].otp || verifiedRecords[0].otp.length !== 64) {
      console.error('[SECURITY ERROR] Insecure or truncated registration token found in database.');
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired registration session. Please verify your email again.'
      });
    }

    const isTokenValid = safeTimingCompare(clientHash, verifiedRecords[0].otp);
    if (!isTokenValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired registration session. Please verify your email again.'
      });
    }

    // Check if user already exists
    const [existingUsers] = await db.query('SELECT id FROM users WHERE email = ?', [normalizedEmail]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    await db.query(
      'INSERT INTO users (full_name, mobile, email, board, class, password) VALUES (?, ?, ?, ?, ?, ?)',
      [full_name, mobile, normalizedEmail, board, studentClass, hashedPassword]
    );

    // Invalidate the verified registration record so it cannot be replayed
    await db.query('DELETE FROM otps WHERE email = ? AND type = ?', [normalizedEmail, 'register_verified']);

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Error in registration:', error);
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
};

// ==========================================
// LOGIN FLOW
// ==========================================

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    // P0-8: Enforce missing JWT_SECRET fails safely
    if (!process.env.JWT_SECRET) {
      console.error('Server configuration error: JWT_SECRET environment variable is missing.');
      return res.status(500).json({ success: false, message: 'Authentication service temporarily unavailable' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // P0-6: Login Rate Limiting Check
    const rateCheck = await checkLoginRateLimit(normalizedEmail);
    if (!rateCheck.allowed) {
      return res.status(429).json({ success: false, message: rateCheck.message });
    }

    // Find user by email
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [normalizedEmail]);
    const user = users[0];

    if (!user) {
      // Run dummy compare to mitigate timing-based user enumeration attacks
      await bcrypt.compare(password, '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqr');
      await recordFailedLogin(normalizedEmail);
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Compare passwords
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      await recordFailedLogin(normalizedEmail);
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Successful login: reset failed login attempts
    await resetLoginRateLimit(normalizedEmail);

    // Generate a unique session token for Single Device Login
    const sessionToken = crypto.randomBytes(32).toString('hex');

    // Update the user's session_token in the database
    await db.query('UPDATE users SET session_token = ? WHERE id = ?', [sessionToken, user.id]);

    // Generate JWT token including the session_token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role || 'student',
        session_token: sessionToken
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ success: true, token, role: user.role || 'student', message: 'Login successful' });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
};

// ==========================================
// FORGOT PASSWORD FLOW
// ==========================================

exports.sendForgotPasswordOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required' });
    }
    const normalizedEmail = email.toLowerCase().trim();

    // Rate Limit Check & 60s cooldown
    const rateCheck = await checkOtpRateLimit(normalizedEmail, 'forgot');
    if (!rateCheck.allowed) {
      return res.status(429).json({ success: false, message: rateCheck.message });
    }

    // Check if user exists
    const [users] = await db.query('SELECT id FROM users WHERE email = ?', [normalizedEmail]);

    // Do NOT leak whether user exists (P0-6 & generic error requirements)
    if (users.length === 0) {
      // Simulate slight delay to prevent timing discrepancy
      await new Promise(resolve => setTimeout(resolve, 150));
      return res.json({ success: true, message: 'If this email is registered, an OTP has been sent to your email.' });
    }

    // Clean up any stale unverified forgot_password records for this email
    await db.query('DELETE FROM otps WHERE email = ? AND type IN (?, ?)', [normalizedEmail, 'forgot_password', 'forgot_verified']);

    // P0-3: Secure OTP generation
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60000); // 10 minutes

    // Send OTP via Email (emailService does NOT log OTP)
    await emailService.sendOTP(normalizedEmail, otp, 'forgot_password');

    // P0-4: Hashed OTP storage
    await storeOTP(normalizedEmail, otp, expiresAt, 'forgot_password');

    res.json({ success: true, message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Error sending forgot password OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
};

exports.verifyForgotPasswordOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email and OTP are required' });
    }
    const normalizedEmail = email.toLowerCase().trim();

    // Verify OTP with attempt limits and expiry check
    const result = await verifyOtpAttempt(normalizedEmail, otp.trim(), 'forgot_password');
    if (!result.success) {
      return res.status(400).json({ success: false, message: result.message });
    }

    // Clean up any existing forgot_verified records for this email
    await db.query('DELETE FROM otps WHERE email = ? AND type = ?', [normalizedEmail, 'forgot_verified']);

    // Generate cryptographic resetToken
    const resetToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = hashToken(resetToken);
    const expiresAt = new Date(Date.now() + 15 * 60000); // 15-minute reset window

    // Store authorization record
    await storeVerifiedToken(normalizedEmail, tokenHash, expiresAt, 'forgot_verified');

    res.json({
      success: true,
      message: 'OTP verified successfully',
      resetToken
    });
  } catch (error) {
    console.error('Error verifying forgot password OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to verify OTP' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, password, resetToken } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }
    const normalizedEmail = email.toLowerCase().trim();

    // P0-7: Password policy enforcement
    const pwdCheck = validatePasswordPolicy(password);
    if (!pwdCheck.valid) {
      return res.status(400).json({ success: false, message: pwdCheck.message });
    }

    // P0-2: Require server-authoritative reset authorization
    const [verifiedRecords] = await db.query(
      'SELECT * FROM otps WHERE email = ? AND type = ? AND expires_at > NOW() ORDER BY id DESC LIMIT 1',
      [normalizedEmail, 'forgot_verified']
    );

    if (verifiedRecords.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Password reset authorization has expired or is invalid. Please request a new OTP.'
      });
    }

    // Reset token must be provided and must match
    if (!resetToken) {
      return res.status(400).json({
        success: false,
        message: 'Reset authorization token is missing. Please verify OTP again.'
      });
    }

    const clientHash = hashToken(resetToken);
    if (!verifiedRecords[0].otp || verifiedRecords[0].otp.length !== 64) {
      console.error('[SECURITY ERROR] Insecure or truncated reset token found in database.');
      return res.status(400).json({
        success: false,
        message: 'Invalid reset token. Please request a new OTP.'
      });
    }

    const isTokenValid = safeTimingCompare(clientHash, verifiedRecords[0].otp);

    if (!isTokenValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid reset token. Please request a new OTP.'
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Invalidate any active user sessions across devices upon password reset
    const newSessionToken = crypto.randomBytes(32).toString('hex');

    // Update user password and session_token
    const [result] = await db.query(
      'UPDATE users SET password = ?, session_token = ? WHERE email = ?',
      [hashedPassword, newSessionToken, normalizedEmail]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Delete the verified authorization record to prevent replay
    await db.query('DELETE FROM otps WHERE email = ? AND type = ?', [normalizedEmail, 'forgot_verified']);

    res.json({ success: true, message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ success: false, message: 'Failed to reset password' });
  }
};

// ==========================================
// CHANGE PASSWORD (AUTHENTICATED)
// ==========================================

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Current password and new password are required' });
    }

    // P0-7: Password policy enforcement
    const pwdCheck = validatePasswordPolicy(newPassword);
    if (!pwdCheck.valid) {
      return res.status(400).json({ success: false, message: pwdCheck.message });
    }

    const [users] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
    const user = users[0];

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ success: false, message: 'Incorrect current password' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    // Invalidate other sessions
    const newSessionToken = crypto.randomBytes(32).toString('hex');
    await db.query('UPDATE users SET password = ?, session_token = ? WHERE id = ?', [hashedNewPassword, newSessionToken, userId]);

    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ success: false, message: 'Failed to change password' });
  }
};
