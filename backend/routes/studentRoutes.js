const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
// const { protect, authorize } = require('../middleware/authMiddleware');

// Note: Middleware like `protect` should be added to secure these routes in production
// router.use(protect);
// router.use(authorize('student'));

router.get('/dashboard', studentController.getDashboardStats);
router.get('/profile', studentController.getProfile);
router.get('/fees', studentController.getFees);

router.route('/tickets')
  .get(studentController.getTickets)
  .post(studentController.createTicket);

module.exports = router;
