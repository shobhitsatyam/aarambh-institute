const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Registration routes
router.post('/register/send-otp', authController.sendRegisterOtp);
router.post('/register/verify-otp', authController.verifyRegisterOtp);
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// Forgot Password routes
router.post('/forgot-password/send-otp', authController.sendForgotPasswordOtp);
router.post('/forgot-password/verify-otp', authController.verifyForgotPasswordOtp);
router.post('/forgot-password/reset', authController.resetPassword);

module.exports = router;
