const db = require('../config/db');

exports.getDashboardStats = async (req, res) => {
  try {
    const [studentsResult] = await db.execute('SELECT COUNT(*) as count FROM users WHERE role="student"');
    const activeStudents = studentsResult[0].count;

    const [revenueResult] = await db.execute('SELECT SUM(amount) as total FROM fee_installments WHERE status="Paid"');
    const monthlyRevenue = revenueResult[0].total || 0;

    const [ticketsResult] = await db.execute('SELECT COUNT(*) as count FROM tickets WHERE status!="Closed" AND status!="Resolved"');
    const openTickets = ticketsResult[0].count;

    const [classes] = await db.execute('SELECT id, subject, DATE_FORMAT(schedule_time, "%h:%i %p") as time, status FROM classes WHERE status="Live" OR status="Upcoming" LIMIT 5');

    // Assume we have a contact_queries table, but for now we'll return 0 if it doesn't exist
    let newQueries = 0;
    try {
      const [queriesResult] = await db.execute('SELECT COUNT(*) as count FROM contact_messages WHERE status="Unread"');
      newQueries = queriesResult[0].count;
    } catch (e) {
      // Ignore if table doesn't exist
    }

    res.json({
      success: true,
      data: {
        activeStudents,
        monthlyRevenue,
        openTickets,
        newQueries,
        liveClassesToday: classes,
        recentLeads: []
      }
    });
  } catch (error) {
    console.error('Error in getDashboardStats:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get Finance Stats
// @route   GET /api/admin/finance
exports.getFinanceStats = async (req, res) => {
  try {
    const [collectionResult] = await db.execute('SELECT SUM(paid_amount) as total FROM student_fees');
    const totalCollection = collectionResult[0].total || 0;

    const [pendingResult] = await db.execute('SELECT SUM(pending_amount) as total FROM student_fees');
    const pendingDues = pendingResult[0].total || 0;

    const [paidStudentsResult] = await db.execute('SELECT COUNT(*) as count FROM student_fees WHERE pending_amount = 0 AND total_fee > 0');
    const fullyPaidStudents = paidStudentsResult[0].count || 0;

    const [transactions] = await db.execute(`
      SELECT f.id, u.full_name as student, f.amount, f.status, f.receipt_no
      FROM fee_installments f 
      JOIN users u ON f.student_id = u.id 
      ORDER BY f.created_at DESC LIMIT 10
    `);

    res.json({
      success: true,
      data: {
        totalCollection,
        pendingDues,
        fullyPaidStudents,
        transactions: transactions.map(t => ({
          id: t.receipt_no || `#TRX-${t.id}`,
          student: t.student,
          amount: t.amount,
          status: t.status === 'Paid' ? 'Success' : t.status
        }))
      }
    });
  } catch (error) {
    console.error('Error in getFinanceStats:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const [students] = await db.execute('SELECT id, full_name as name, class as course, "Active" as status FROM users WHERE role="student"');
    res.json({
      success: true,
      data: students.map(s => ({
        id: s.id,
        displayId: `#STU-10${s.id}`,
        name: s.name,
        course: s.course,
        status: s.status
      }))
    });
  } catch (error) {
    console.error('Error in getAllStudents:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.addStudent = async (req, res) => {
  try {
    const { fullName, email, mobile, board, course, password } = req.body;
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(password || 'student123', 10);

    await db.execute(
      'INSERT INTO users (full_name, mobile, email, board, class, password, role) VALUES (?, ?, ?, ?, ?, ?, "student")',
      [fullName, mobile, email, board, course, hashedPassword]
    );

    res.status(201).json({ success: true, message: 'Student added successfully' });
  } catch (error) {
    console.error('Error in addStudent:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.createTeacher = async (req, res) => {
  try {
    const { name, email, phone, subject, experience, password } = req.body;
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(password || 'teacher123', 10);

    // Save to users table with role teacher. Using class column for subject.
    await db.execute(
      'INSERT INTO users (full_name, mobile, email, board, class, password, role) VALUES (?, ?, ?, ?, ?, ?, "teacher")',
      [name, phone, email, experience || '0 Yrs', subject || 'N/A', hashedPassword]
    );

    res.status(201).json({ success: true, message: 'Teacher created successfully' });
  } catch (error) {
    console.error('Error in createTeacher:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, course, status } = req.body;
    // note: field names in DB are full_name, email, mobile, class
    await db.execute(
      'UPDATE users SET full_name=?, email=?, mobile=?, class=? WHERE id=? AND role="student"',
      [name, email, phone, course, id]
    );
    res.json({ success: true, message: 'Student updated successfully' });
  } catch (error) {
    console.error('Error in updateStudent:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute('DELETE FROM users WHERE id=? AND role="student"', [id]);
    res.json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error in deleteStudent:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.getAttendance = async (req, res) => {
  res.json({ success: true, data: [] });
};

exports.markAttendance = async (req, res) => {
  res.status(200).json({ success: true, message: 'Attendance marked' });
};

exports.getAllTickets = async (req, res) => {
  res.json({ success: true, data: [] });
};

exports.updateTicketStatus = async (req, res) => {
  res.status(200).json({ success: true, message: 'Ticket updated' });
};

exports.getLiveClasses = async (req, res) => {
  res.json({ success: true, data: [] });
};

exports.scheduleLiveClass = async (req, res) => {
  res.status(201).json({ success: true, message: 'Class scheduled' });
};

// --- STUDY MATERIALS ---
exports.getMaterials = async (req, res) => {
  try {
    const [materials] = await db.execute('SELECT * FROM study_materials ORDER BY created_at DESC');
    res.json({ success: true, data: materials });
  } catch (error) {
    console.error('Error in getMaterials:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.addMaterial = async (req, res) => {
  try {
    const { title, type, course, price } = req.body;
    const is_free = req.body.is_free === 'true' || req.body.is_free === true;
    let file_url = '#';
    let size = 'Unknown';
    if (req.file) {
      file_url = `/uploads/${req.file.filename}`;
      size = (req.file.size / (1024 * 1024)).toFixed(2) + ' MB';
    } else if (req.body.file_url) {
      file_url = req.body.file_url;
      size = req.body.size || '1 MB';
    }

    await db.execute(
      'INSERT INTO study_materials (title, type, course, size, is_free, price, file_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, type, course, size, is_free ? 1 : 0, price || 0, file_url]
    );
    res.status(201).json({ success: true, message: 'Material added successfully' });
  } catch (error) {
    console.error('Error in addMaterial:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.updateMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_free, price } = req.body;
    await db.execute('UPDATE study_materials SET is_free = ?, price = ? WHERE id = ?', [is_free ? 1 : 0, price, id]);
    res.json({ success: true, message: 'Material updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.deleteMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute('DELETE FROM study_materials WHERE id=?', [id]);
    res.json({ success: true, message: 'Material deleted successfully' });
  } catch (error) {
    console.error('Error in deleteMaterial:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// --- COURSES ---
exports.getCourses = async (req, res) => {
  try {
    const [courses] = await db.execute('SELECT * FROM courses ORDER BY created_at DESC');
    res.json({ success: true, data: courses });
  } catch (error) {
    console.error('Error in getCourses:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.addCourse = async (req, res) => {
  try {
    const { title, description, duration, price } = req.body;
    const is_free = req.body.is_free === 'true' || req.body.is_free === true;
    const includes_live_classes = req.body.includes_live_classes === 'true' || req.body.includes_live_classes === true;
    const includes_recorded_classes = req.body.includes_recorded_classes === 'true' || req.body.includes_recorded_classes === true;
    
    let thumbnail = '#';
    if (req.file) {
      thumbnail = `/uploads/${req.file.filename}`;
    } else if (req.body.thumbnail) {
      thumbnail = req.body.thumbnail;
    }

    await db.execute(
      'INSERT INTO courses (title, description, duration, is_free, price, includes_live_classes, includes_recorded_classes, thumbnail) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description || '', duration || '3 Months', is_free ? 1 : 0, price || 0, includes_live_classes ? 1 : 0, includes_recorded_classes ? 1 : 0, thumbnail]
    );
    res.status(201).json({ success: true, message: 'Course added successfully' });
  } catch (error) {
    console.error('Error in addCourse:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_free, price, includes_live_classes, includes_recorded_classes } = req.body;
    await db.execute(
      'UPDATE courses SET is_free = ?, price = ?, includes_live_classes = ?, includes_recorded_classes = ? WHERE id = ?', 
      [is_free ? 1 : 0, price, includes_live_classes ? 1 : 0, includes_recorded_classes ? 1 : 0, id]
    );
    res.json({ success: true, message: 'Course updated successfully' });
  } catch (error) {
    console.error('Error in updateCourse:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute('DELETE FROM courses WHERE id=?', [id]);
    res.json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error in deleteCourse:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// --- EXAMS ---
exports.getExams = async (req, res) => {
  try {
    const [exams] = await db.execute('SELECT * FROM exams ORDER BY created_at DESC');
    res.json({ success: true, data: exams });
  } catch (error) {
    console.error('Error in getExams:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.addExam = async (req, res) => {
  try {
    const { title, course, exam_date, exam_time } = req.body;
    const exam_id = `EXM-${Math.floor(100 + Math.random() * 900)}`;
    await db.execute(
      'INSERT INTO exams (exam_id, title, course, exam_date, exam_time) VALUES (?, ?, ?, ?, ?)',
      [exam_id, title, course, exam_date, exam_time]
    );
    res.status(201).json({ success: true, message: 'Exam scheduled successfully' });
  } catch (error) {
    console.error('Error in addExam:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
