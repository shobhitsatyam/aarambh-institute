const db = require('../config/db');

// @desc    Get Student Dashboard Stats
// @route   GET /api/student/dashboard
exports.getDashboardStats = async (req, res) => {
  try {
    // Assuming student ID is attached to req.user by auth middleware
    const studentId = req.user ? req.user.id : 1; // Default to 1 for testing

    // Fetch basic stats (Mocked queries for now, relying on expected tables)
    // const [attendanceStats] = await db.execute('SELECT COUNT(*) as present FROM attendance WHERE student_id = ? AND status = "Present"', [studentId]);
    // const [feeStats] = await db.execute('SELECT total_fee, paid_fee FROM student_fees WHERE student_id = ?', [studentId]);
    
    // For now, return structured data that the React dashboard expects
    res.json({
      success: true,
      data: {
        studentName: 'Rahul Sharma', // Would come from DB
        attendancePercentage: 85,
        activeSubjects: 4,
        pendingFees: 15000,
        lastExamScore: 82,
        upcomingClasses: [
          { id: 1, subject: 'Physics', topic: 'Kinematics', time: '10:00 AM', status: 'Live' },
          { id: 2, subject: 'Chemistry', topic: 'Organic', time: '12:00 PM', status: 'Upcoming' }
        ],
        recentNotifications: [
          { id: 1, title: 'Holiday Announcement', time: '2 hours ago', icon: 'bullhorn' },
          { id: 2, title: 'Fee Payment Reminder', time: 'Yesterday', icon: 'wallet' }
        ]
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
    const studentId = req.user ? req.user.id : 1;
    // const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [studentId]);
    
    res.json({
      success: true,
      data: {
        id: '#STU-1024',
        name: 'Rahul Sharma',
        email: 'rahul.s@example.com',
        phone: '+91 9876543210',
        course: 'BBOSE 10th - Morning',
        joinDate: 'Aug 10, 2026',
        address: '123, Block C, Malviya Nagar, New Delhi'
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get Course Fees
// @route   GET /api/student/fees
exports.getFees = async (req, res) => {
  try {
    const studentId = req.user ? req.user.id : 1;
    // const [fees] = await db.execute('SELECT * FROM fees WHERE student_id = ?', [studentId]);
    
    res.json({
      success: true,
      data: {
        totalFee: 45000,
        paidAmount: 15000,
        pendingAmount: 30000,
        installments: [
          { id: 1, amount: 15000, dueDate: 'Aug 15, 2026', status: 'Paid', receiptNo: 'REC-00124' },
          { id: 2, amount: 15000, dueDate: 'Nov 15, 2026', status: 'Pending', receiptNo: null },
          { id: 3, amount: 15000, dueDate: 'Feb 15, 2027', status: 'Pending', receiptNo: null },
        ]
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get Support Tickets
// @route   GET /api/student/tickets
exports.getTickets = async (req, res) => {
  try {
    // const [tickets] = await db.execute('SELECT * FROM tickets WHERE student_id = ?', [req.user.id]);
    res.json({
      success: true,
      data: [
        { id: '#TKT-104', subject: 'Login issue on mobile app', date: 'Oct 24, 2026', status: 'Open', lastUpdate: '2 hours ago' },
        { id: '#TKT-103', subject: 'Missing study material for Physics', date: 'Oct 22, 2026', status: 'Resolved', lastUpdate: '1 day ago' }
      ]
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Create Support Ticket
// @route   POST /api/student/tickets
exports.createTicket = async (req, res) => {
  try {
    const { category, subject, description } = req.body;
    // await db.execute('INSERT INTO tickets (student_id, category, subject, description, status) VALUES (?, ?, ?, ?, ?)', [req.user.id, category, subject, description, 'Open']);
    
    res.status(201).json({ success: true, message: 'Ticket created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
