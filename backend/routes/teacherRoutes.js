const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Secure all teacher routes
router.use(protect);
router.use(authorize('teacher'));

router.get('/dashboard', teacherController.getDashboardStats);
router.get('/classes', teacherController.getMyClasses);
router.get('/students', teacherController.getStudents);
router.get('/notifications', teacherController.getNotifications);
router.route('/assignments')
  .get(teacherController.getAssignments)
  .post(teacherController.createAssignment);

router.route('/doubts')
  .get(teacherController.getDoubts);

router.route('/doubts/:id')
  .put(teacherController.answerDoubt);

router.route('/attendance')
  .post(teacherController.markAttendance);

module.exports = router;
