const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const db = require('../config/db');
const emailService = require('../utils/emailService');

// Helper to generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Helper for Rate Limiting (Max 3 times, block for 2 hours)
const checkRateLimit = async (email) => {
  const [limits] = await db.query('SELECT * FROM otp_rate_limits WHERE email = ?', [email]);
  const now = new Date();
  
  if (limits.length > 0) {
    const limitInfo = limits[0];
    
    // Check if currently blocked
    if (limitInfo.block_until && new Date(limitInfo.block_until) > now) {
      return { allowed: false, message: 'Too many attempts. Please try again after 2 hours.' };
    }
    
    // Check if the last attempt was more than 2 hours ago. If so, reset attempts.
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
    let newAttempts = limitInfo.attempts + 1;
    
    if (new Date(limitInfo.last_attempt) < twoHoursAgo || (limitInfo.block_until && new Date(limitInfo.block_until) <= now)) {
      newAttempts = 1;
    }
    
    if (newAttempts > 3) {
      // Block for 2 hours
      const blockUntil = new Date(now.getTime() + 2 * 60 * 60 * 1000);
      await db.query(
        'UPDATE otp_rate_limits SET attempts = 3, last_attempt = ?, block_until = ? WHERE email = ?',
        [now, blockUntil, email]
      );
      return { allowed: false, message: 'Too many attempts. Please try again after 2 hours.' };
    } else {
      await db.query(
        'UPDATE otp_rate_limits SET attempts = ?, last_attempt = ?, block_until = NULL WHERE email = ?',
        [newAttempts, now, email]
      );
      return { allowed: true };
    }
  } else {
    // First attempt
    await db.query(
      'INSERT INTO otp_rate_limits (email, attempts, last_attempt) VALUES (?, 1, ?)',
      [email, now]
    );
    return { allowed: true };
  }
};

// ==========================================
// REGISTRATION FLOW
// ==========================================

exports.sendRegisterOtp = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if user already exists
    const [existingUsers] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ success: false, message: 'Email is already registered' });
    }

    // Rate Limit Check
    const rateCheck = await checkRateLimit(email);
    if (!rateCheck.allowed) {
      return res.status(429).json({ success: false, message: rateCheck.message });
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60000); // 10 minutes from now

    // Send OTP via Email
    await emailService.sendOTP(email, otp, 'register');

    // Store OTP in database
    await db.query(
      'INSERT INTO otps (email, otp, expires_at, type) VALUES (?, ?, ?, ?)',
      [email, otp, expiresAt, 'register']
    );

    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending registration OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
};

exports.verifyRegisterOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const [otps] = await db.query(
      'SELECT * FROM otps WHERE email = ? AND otp = ? AND type = ? AND expires_at > NOW() ORDER BY id DESC LIMIT 1',
      [email, otp, 'register']
    );

    if (otps.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    // OTP verified successfully, we can delete it now or let it expire
    await db.query('DELETE FROM otps WHERE id = ?', [otps[0].id]);

    res.json({ success: true, message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error verifying registration OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to verify OTP' });
  }
};

exports.register = async (req, res) => {
  try {
    const { full_name, mobile, email, board, class: studentClass, password } = req.body;

    // Check if user already exists
    const [existingUsers] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    await db.query(
      'INSERT INTO users (full_name, mobile, email, board, class, password) VALUES (?, ?, ?, ?, ?, ?)',
      [full_name, mobile, email, board, studentClass, hashedPassword]
    );

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

    // Find user by email
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = users[0];

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Compare passwords
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

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

    // Check if user exists
    const [users] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'Email not registered' });
    }

    // Rate Limit Check
    const rateCheck = await checkRateLimit(email);
    if (!rateCheck.allowed) {
      return res.status(429).json({ success: false, message: rateCheck.message });
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60000); // 10 minutes

    // Send OTP via Email
    await emailService.sendOTP(email, otp, 'forgot_password');

    // Store OTP in database
    await db.query(
      'INSERT INTO otps (email, otp, expires_at, type) VALUES (?, ?, ?, ?)',
      [email, otp, expiresAt, 'forgot_password']
    );

    res.json({ success: true, message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Error sending forgot password OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
};

exports.verifyForgotPasswordOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const [otps] = await db.query(
      'SELECT * FROM otps WHERE email = ? AND otp = ? AND type = ? AND expires_at > NOW() ORDER BY id DESC LIMIT 1',
      [email, otp, 'forgot_password']
    );

    if (otps.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    // We do NOT delete the OTP here because we might want to check it again during the reset phase, 
    // or we can rely on a temporary token. For simplicity, we just return success.
    res.json({ success: true, message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error verifying forgot password OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to verify OTP' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password
    const [result] = await db.query(
      'UPDATE users SET password = ? WHERE email = ?',
      [hashedPassword, email]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Delete any forgot_password OTPs for this user
    await db.query('DELETE FROM otps WHERE email = ? AND type = ?', [email, 'forgot_password']);

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
    await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedNewPassword, userId]);

    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ success: false, message: 'Failed to change password' });
  }
};
