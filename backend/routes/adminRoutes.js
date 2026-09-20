const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.use(protect);
router.use(authorize('admin'));

router.get('/dashboard', adminController.getDashboardStats);
router.get('/finance', adminController.getFinanceStats);

router.route('/students')
  .get(adminController.getAllStudents)
  .post(adminController.addStudent);

router.route('/students/:id')
  .put(adminController.updateStudent)
  .delete(adminController.deleteStudent);

router.route('/teachers')
  .post(adminController.createTeacher);

router.route('/attendance')
  .get(adminController.getAttendance)
  .post(adminController.markAttendance);

router.route('/tickets')
  .get(adminController.getAllTickets)
  .put(adminController.updateTicketStatus);

router.route('/classes')
  .get(adminController.getLiveClasses)
  .post(adminController.scheduleLiveClass);

router.route('/materials')
  .get(adminController.getMaterials)
  .post(upload.single('file'), adminController.addMaterial);

router.route('/materials/:id')
  .put(adminController.updateMaterial)
  .delete(adminController.deleteMaterial);

router.route('/courses')
  .get(adminController.getCourses)
  .post(upload.single('thumbnail'), adminController.addCourse);

router.route('/courses/:id')
  .put(adminController.updateCourse)
  .delete(adminController.deleteCourse);

router.route('/exams')
  .get(adminController.getExams)
  .post(adminController.addExam);

module.exports = router;
