const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
// const { protect, authorize } = require('../middleware/authMiddleware');

// Note: Middleware like `protect` and `authorize('admin')` should be added in production
// router.use(protect);
// router.use(authorize('admin'));

router.get('/dashboard', adminController.getDashboardStats);
router.get('/finance', adminController.getFinanceStats);

router.route('/students')
  .get(adminController.getAllStudents)
  .post(adminController.addStudent);

router.route('/attendance')
  .get(adminController.getAttendance)
  .post(adminController.markAttendance);

router.route('/tickets')
  .get(adminController.getAllTickets)
  .put(adminController.updateTicketStatus);

router.route('/classes')
  .get(adminController.getLiveClasses)
  .post(adminController.scheduleLiveClass);

module.exports = router;
