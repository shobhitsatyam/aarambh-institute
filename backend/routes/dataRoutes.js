const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');
const authMiddleware = require('../middleware/authMiddleware');

// Protect this route with authMiddleware
router.get('/secure', authMiddleware, dataController.getSecureData);

module.exports = router;
