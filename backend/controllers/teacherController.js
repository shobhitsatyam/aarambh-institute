const db = require('../config/db');

// Helper to get teacher ID/Name
const getTeacherData = async (req) => {
  const teacherId = req.user.id;
  const [rows] = await db.execute('SELECT full_name as name FROM users WHERE id = ?', [teacherId]);
  return { id: teacherId, name: rows.length > 0 ? rows[0].name : 'Teacher' };
};

// @desc    Get Teacher Dashboard Stats
// @route   GET /api/teacher/dashboard
exports.getDashboardStats = async (req, res) => {
  try {
    const teacher = await getTeacherData(req);

    // Get upcoming classes for this teacher
    const [classes] = await db.execute(
      'SELECT id, subject, topic, DATE_FORMAT(schedule_time, "%h:%i %p") as time, status FROM classes WHERE instructor = ? AND status IN ("Live", "Upcoming") ORDER BY schedule_time ASC LIMIT 3',
      [teacher.name]
    );

    // We count total students (could be optimized later to match only subjects taught by this teacher)
    const [studentRows] = await db.execute('SELECT COUNT(*) as total FROM users WHERE role = "student"');
    const totalStudents = studentRows[0].total;

    // Calculate pending doubts
    const [doubtsRow] = await db.execute('SELECT COUNT(*) as total FROM doubts WHERE status="Pending"');
    const pendingDoubts = doubtsRow[0].total;

    // Calculate assignments to grade
    const [assignmentsRow] = await db.execute('SELECT COUNT(*) as total FROM assignment_submissions WHERE status="Pending"');
    const assignmentsToGrade = assignmentsRow[0].total;

    res.json({
      success: true,
      data: {
        teacherName: teacher.name,
        upcomingClasses: classes,
        totalStudentsAssigned: totalStudents,
        pendingDoubts,
        assignmentsToGrade
      }
    });
  } catch (error) {
    console.error('Error in teacher getDashboardStats:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get Teacher's Classes
// @route   GET /api/teacher/classes
exports.getMyClasses = async (req, res) => {
  try {
    const teacher = await getTeacherData(req);
    const [classes] = await db.execute(
      'SELECT id, subject, topic, DATE_FORMAT(schedule_time, "%Y-%m-%d") as date, DATE_FORMAT(schedule_time, "%h:%i %p") as time, status, duration FROM classes WHERE instructor = ? ORDER BY schedule_time DESC',
      [teacher.name]
    );

    res.json({ success: true, data: classes });
  } catch (error) {
    console.error('Error in getMyClasses:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get Teacher's Students
// @route   GET /api/teacher/students
exports.getStudents = async (req, res) => {
  try {
    const [students] = await db.execute('SELECT id, full_name as name, email, class as course FROM users WHERE role="student"');
    res.json({
      success: true,
      data: students.map(s => ({
        id: `#STU-10${s.id}`,
        name: s.name,
        email: s.email,
        course: s.course,
        attendance: '0%' // Reset for test
      }))
    });
  } catch (error) {
    console.error('Error in getStudents:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get Teacher Notifications
// @route   GET /api/teacher/notifications
exports.getNotifications = async (req, res) => {
  try {
    const [notifications] = await db.execute(
      'SELECT id, type as icon, title, message, DATE_FORMAT(created_at, "%b %d, %h:%i %p") as time FROM notifications WHERE student_id IS NULL ORDER BY created_at DESC LIMIT 10'
    );
    res.json({ success: true, data: notifications });
  } catch (error) {
    console.error('Error in getNotifications:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get Assignments
// @route   GET /api/teacher/assignments
exports.getAssignments = async (req, res) => {
  try {
    const teacher = await getTeacherData(req);
    const [assignments] = await db.execute(
      `SELECT a.id, a.title, a.subject, DATE_FORMAT(a.due_date, "%b %d, %Y") as dueDate, a.total_marks as total, 
      (SELECT COUNT(*) FROM assignment_submissions s WHERE s.assignment_id = a.id) as submitted 
      FROM assignments a WHERE a.teacher_id = ? ORDER BY a.created_at DESC`,
      [teacher.id]
    );
    res.json({ success: true, data: assignments });
  } catch (error) {
    console.error('Error in getAssignments:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.createAssignment = async (req, res) => {
  try {
    const teacher = await getTeacherData(req);
    const { title, subject, dueDate, totalMarks } = req.body;
    await db.execute(
      'INSERT INTO assignments (teacher_id, title, subject, due_date, total_marks) VALUES (?, ?, ?, ?, ?)',
      [teacher.id, title, subject, dueDate, totalMarks || 100]
    );
    res.status(201).json({ success: true, message: 'Assignment created successfully' });
  } catch (error) {
    console.error('Error in createAssignment:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.getDoubts = async (req, res) => {
  try {
    const [doubts] = await db.execute('SELECT id, student_id, subject, topic, question, status, DATE_FORMAT(created_at, "%b %d, %h:%i %p") as time FROM doubts WHERE status="Pending" ORDER BY created_at DESC');
    res.json({ success: true, data: doubts });
  } catch (error) {
    console.error('Error in getDoubts:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.answerDoubt = async (req, res) => {
  try {
    const { id } = req.params;
    const { answer } = req.body;
    await db.execute('UPDATE doubts SET status="Answered", answer=? WHERE id=?', [answer, id]);
    res.json({ success: true, message: 'Doubt answered successfully' });
  } catch (error) {
    console.error('Error in answerDoubt:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.markAttendance = async (req, res) => {
  try {
    const { studentId, subject, date, time, status } = req.body;
    await db.execute(
      'INSERT INTO attendance (student_id, subject, date, time, status) VALUES (?, ?, ?, ?, ?)',
      [studentId, subject, date, time, status]
    );
    res.status(201).json({ success: true, message: 'Attendance marked' });
  } catch (error) {
    console.error('Error in markAttendance:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
