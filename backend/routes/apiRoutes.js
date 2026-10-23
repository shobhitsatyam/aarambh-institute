const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
  res.json({ message: 'apiRoutes base endpoint' });
});

router.get('/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    return res.status(200).json({ status: 'ok' });
  } catch (error) {
    return res.status(503).json({ status: 'error', message: 'Database unavailable' });
  }
});

module.exports = router;
