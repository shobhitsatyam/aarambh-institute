const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');
const { protect } = require('../middleware/authMiddleware');

// Protect this route with authMiddleware
router.get('/secure', protect, dataController.getSecureData);

module.exports = router;
