const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');

// Note: Applying auth middleware to secure all student routes
router.use(protect);

router.get('/dashboard', studentController.getDashboardStats);
router.get('/profile', studentController.getProfile);
router.get('/fees', studentController.getFees);

// Support Tickets
router.route('/tickets')
  .get(studentController.getTickets)
  .post(studentController.createTicket);

// Attendance
router.get('/attendance', studentController.getAttendance);

// Doubts
router.route('/doubts')
  .get(studentController.getDoubts)
  .post(studentController.createDoubt);

// Notifications
router.get('/notifications', studentController.getNotifications);

// Feedback
router.post('/feedback', studentController.submitFeedback);

// Switch Program
router.post('/switch-program', studentController.submitProgramChange);

// Classes / Academic Calendar
router.get('/classes', studentController.getClasses);

// Study Materials
router.get('/materials', studentController.getMaterials);

// Courses
router.get('/courses', studentController.getCourses);

module.exports = router;
