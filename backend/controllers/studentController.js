const db = require('../config/db');

// Helper to get student ID from authenticated JWT token
const getStudentId = (req) => {
  return req.user.id;
};

// @desc    Get Student Dashboard Stats
// @route   GET /api/student/dashboard
exports.getDashboardStats = async (req, res) => {
  try {
    const studentId = getStudentId(req);

    // Fetch user details
    const [userRows] = await db.execute('SELECT full_name FROM users WHERE id = ?', [studentId]);
    const studentName = userRows.length > 0 ? userRows[0].full_name : 'Student';

    // Fetch attendance stats (optional table)
    let attendancePercentage = 0;
    try {
      const [attendanceRows] = await db.execute(
        'SELECT COUNT(*) as total, SUM(CASE WHEN status = "Present" THEN 1 ELSE 0 END) as present FROM attendance WHERE student_id = ?',
        [studentId]
      );
      const totalClasses = Number(attendanceRows[0]?.total) || 0;
      const presentClasses = Number(attendanceRows[0]?.present) || 0;
      attendancePercentage = totalClasses > 0 ? Math.round((presentClasses / totalClasses) * 100) : 0;
    } catch (error) {
      if (error.code === 'ER_NO_SUCH_TABLE') {
        console.warn('Optional table "attendance" not found, defaulting attendance stats.');
      } else {
        throw error;
      }
    }

    // Fetch fees (optional table)
    let pendingFees = 0;
    try {
      const [feeRows] = await db.execute('SELECT pending_amount FROM student_fees WHERE student_id = ?', [studentId]);
      pendingFees = feeRows.length > 0 ? (Number(feeRows[0].pending_amount) || 0) : 0;
    } catch (error) {
      if (error.code === 'ER_NO_SUCH_TABLE') {
        console.warn('Optional table "student_fees" not found, defaulting pending fees.');
      } else {
        throw error;
      }
    }

    // Fetch upcoming classes (optional table)
    let upcomingClasses = [];
    try {
      const [classRows] = await db.execute('SELECT id, subject, topic, DATE_FORMAT(schedule_time, "%h:%i %p") as time, status FROM classes WHERE status IN ("Live", "Upcoming") ORDER BY schedule_time ASC LIMIT 2');
      upcomingClasses = classRows;
    } catch (error) {
      if (error.code === 'ER_NO_SUCH_TABLE') {
        console.warn('Optional table "classes" not found, defaulting upcoming classes.');
      } else {
        throw error;
      }
    }

    // Fetch recent notifications (optional table)
    let recentNotifications = [];
    try {
      const [notificationRows] = await db.execute('SELECT id, title, type as icon, DATE_FORMAT(created_at, "%Y-%m-%d %h:%i %p") as time FROM notifications WHERE student_id = ? OR student_id IS NULL ORDER BY created_at DESC LIMIT 2', [studentId]);
      recentNotifications = notificationRows;
    } catch (error) {
      if (error.code === 'ER_NO_SUCH_TABLE') {
        console.warn('Optional table "notifications" not found, defaulting notifications.');
      } else {
        throw error;
      }
    }

    res.json({
      success: true,
      data: {
        studentName,
        attendancePercentage,
        activeSubjects: 0,
        pendingFees,
        lastExamScore: 0,
        upcomingClasses,
        recentNotifications
      }
    });
  } catch (error) {
    console.error('Error in getDashboardStats:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get Student Profile
// @route   GET /api/student/profile
exports.getProfile = async (req, res) => {
  try {
    const studentId = getStudentId(req);
    const [rows] = await db.execute('SELECT id, full_name as name, email, mobile as phone, class as course, DATE_FORMAT(created_at, "%b %d, %Y") as joinDate FROM users WHERE id = ?', [studentId]);
    
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const user = rows[0];
    user.id = `#STU-10${user.id}`; // Format ID for display
    user.address = 'Not provided'; // Add to DB later if needed

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error in getProfile:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get Course Fees
// @route   GET /api/student/fees
exports.getFees = async (req, res) => {
  try {
    const studentId = getStudentId(req);
    const [feeRows] = await db.execute('SELECT * FROM student_fees WHERE student_id = ?', [studentId]);
    const [installments] = await db.execute('SELECT id, amount, DATE_FORMAT(due_date, "%b %d, %Y") as dueDate, status, receipt_no as receiptNo FROM fee_installments WHERE student_id = ? ORDER BY due_date ASC', [studentId]);
    
    let totalFee = 0;
    let paidAmount = 0;
    let pendingAmount = 0;

    if (feeRows.length > 0) {
      totalFee = feeRows[0].total_fee;
      paidAmount = feeRows[0].paid_amount;
      pendingAmount = feeRows[0].pending_amount;
    }

    res.json({
      success: true,
      data: {
        totalFee,
        paidAmount,
        pendingAmount,
        installments
      }
    });
  } catch (error) {
    console.error('Error in getFees:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get Support Tickets
// @route   GET /api/student/tickets
exports.getTickets = async (req, res) => {
  try {
    const studentId = getStudentId(req);
    const [tickets] = await db.execute('SELECT ticket_id as id, subject, DATE_FORMAT(created_at, "%b %d, %Y") as date, status, DATE_FORMAT(last_update, "%Y-%m-%d %h:%i %p") as lastUpdate FROM tickets WHERE student_id = ? ORDER BY created_at DESC', [studentId]);
    
    res.json({
      success: true,
      data: tickets
    });
  } catch (error) {
    console.error('Error in getTickets:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Create Support Ticket
// @route   POST /api/student/tickets
exports.createTicket = async (req, res) => {
  try {
    const studentId = getStudentId(req);
    const { category, subject, description } = req.body;
    
    // Generate a unique ticket ID
    const ticketId = `#TKT-${Math.floor(Math.random() * 10000)}`;

    await db.execute('INSERT INTO tickets (ticket_id, student_id, category, subject, description) VALUES (?, ?, ?, ?, ?)', [ticketId, studentId, category, subject, description]);
    
    res.status(201).json({ success: true, message: 'Ticket created successfully' });
  } catch (error) {
    console.error('Error in createTicket:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get Attendance
// @route   GET /api/student/attendance
exports.getAttendance = async (req, res) => {
  try {
    const studentId = getStudentId(req);
    const [attendance] = await db.execute('SELECT id, subject, DATE_FORMAT(date, "%b %d, %Y") as date, time, status FROM attendance WHERE student_id = ? ORDER BY date DESC', [studentId]);
    
    res.json({
      success: true,
      data: attendance
    });
  } catch (error) {
    console.error('Error in getAttendance:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get Doubts
// @route   GET /api/student/doubts
exports.getDoubts = async (req, res) => {
  try {
    const studentId = getStudentId(req);
    const [doubts] = await db.execute('SELECT id, subject, topic, question, status, answer, DATE_FORMAT(created_at, "%b %d, %Y") as date FROM doubts WHERE student_id = ? ORDER BY created_at DESC', [studentId]);
    
    res.json({
      success: true,
      data: doubts
    });
  } catch (error) {
    console.error('Error in getDoubts:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Create Doubt
// @route   POST /api/student/doubts
exports.createDoubt = async (req, res) => {
  try {
    const studentId = getStudentId(req);
    const { subject, topic, question } = req.body;
    
    await db.execute('INSERT INTO doubts (student_id, subject, topic, question) VALUES (?, ?, ?, ?)', [studentId, subject, topic, question]);
    
    res.status(201).json({ success: true, message: 'Doubt submitted successfully' });
  } catch (error) {
    console.error('Error in createDoubt:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get Notifications
// @route   GET /api/student/notifications
exports.getNotifications = async (req, res) => {
  try {
    const studentId = getStudentId(req);
    const [notifications] = await db.execute('SELECT id, type, title, message, is_new as isNew, DATE_FORMAT(created_at, "%b %d, %Y %h:%i %p") as time FROM notifications WHERE student_id = ? OR student_id IS NULL ORDER BY created_at DESC', [studentId]);
    
    res.json({
      success: true,
      data: notifications
    });
  } catch (error) {
    console.error('Error in getNotifications:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Submit Feedback
// @route   POST /api/student/feedback
exports.submitFeedback = async (req, res) => {
  try {
    const studentId = getStudentId(req);
    const { rating, category, relatedTeacher, feedbackText } = req.body;
    
    await db.execute('INSERT INTO feedback (student_id, rating, category, related_teacher, feedback_text) VALUES (?, ?, ?, ?, ?)', [studentId, rating, category, relatedTeacher, feedbackText]);
    
    res.status(201).json({ success: true, message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error in submitFeedback:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Submit Program Change Request
// @route   POST /api/student/switch-program
exports.submitProgramChange = async (req, res) => {
  try {
    const studentId = getStudentId(req);
    const { currentProgram, newProgram, reason } = req.body;
    
    await db.execute('INSERT INTO program_change_requests (student_id, current_program, new_program, reason) VALUES (?, ?, ?, ?)', [studentId, currentProgram, newProgram, reason]);
    
    res.status(201).json({ success: true, message: 'Program change request submitted successfully' });
  } catch (error) {
    console.error('Error in submitProgramChange:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get Calendar/Classes
// @route   GET /api/student/classes
exports.getClasses = async (req, res) => {
  try {
    const [classes] = await db.execute('SELECT id, subject, topic, instructor, status, link, thumbnail, DATE_FORMAT(schedule_time, "%Y-%m-%d") as date, DATE_FORMAT(schedule_time, "%h:%i %p") as time, duration FROM classes ORDER BY schedule_time ASC');
    
    res.json({
      success: true,
      data: classes
    });
  } catch (error) {
    console.error('Error in getClasses:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get Study Materials (with purchased status)
// @route   GET /api/student/materials
exports.getMaterials = async (req, res) => {
  try {
    const studentId = getStudentId(req);
    
    // Fetch all materials
    const [materials] = await db.execute('SELECT * FROM study_materials ORDER BY created_at DESC');
    
    // Fetch purchased material IDs for this student
    const [purchased] = await db.execute('SELECT material_id FROM purchased_materials WHERE student_id = ?', [studentId]);
    const purchasedIds = purchased.map(p => p.material_id);
    
    // Attach is_purchased flag
    const data = materials.map(m => ({
      ...m,
      is_purchased: m.is_free ? true : purchasedIds.includes(m.id)
    }));
    
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error in getMaterials:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Buy Material (Mock Payment)
// @route   POST /api/student/buy-material
exports.buyMaterial = async (req, res) => {
  try {
    const studentId = getStudentId(req);
    const { material_id } = req.body;
    
    const [materials] = await db.execute('SELECT price FROM study_materials WHERE id = ?', [material_id]);
    if (materials.length === 0) {
      return res.status(404).json({ success: false, message: 'Material not found' });
    }
    
    const price = materials[0].price;
    
    // Mock Payment: directly insert into purchased_materials
    await db.execute(
      'INSERT INTO purchased_materials (student_id, material_id, amount_paid) VALUES (?, ?, ?)',
      [studentId, material_id, price]
    );
    
    res.json({ success: true, message: 'Purchase successful!' });
  } catch (error) {
    // If it's a duplicate entry (MySQL error 1062)
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ success: false, message: 'You have already purchased this material.' });
    }
    console.error('Error in buyMaterial:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// --- COURSES ---
exports.getCourses = async (req, res) => {
  try {
    const studentId = getStudentId(req);
    
    // Fetch all courses
    const [courses] = await db.execute('SELECT * FROM courses ORDER BY created_at DESC');
    
    // Fetch purchased course IDs for this student
    const [purchased] = await db.execute('SELECT course_id FROM purchased_courses WHERE student_id = ?', [studentId]);
    const purchasedIds = purchased.map(p => p.course_id);
    
    // Attach is_purchased flag
    const data = courses.map(c => ({
      ...c,
      is_purchased: c.is_free ? true : purchasedIds.includes(c.id)
    }));
    
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error in getCourses:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.buyCourse = async (req, res) => {
  try {
    const studentId = getStudentId(req);
    const { course_id } = req.body;
    
    const [courses] = await db.execute('SELECT price FROM courses WHERE id = ?', [course_id]);
    if (courses.length === 0) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    
    const price = courses[0].price;
    
    // Mock Payment: directly insert into purchased_courses
    await db.execute(
      'INSERT INTO purchased_courses (student_id, course_id, price_paid) VALUES (?, ?, ?)',
      [studentId, course_id, price]
    );
    
    res.json({ success: true, message: 'Course purchased successfully!' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ success: false, message: 'You have already purchased this course.' });
    }
    console.error('Error in buyCourse:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
