const db = require('../config/db');

// @desc    Get Admin Dashboard Stats
// @route   GET /api/admin/dashboard
exports.getDashboardStats = async (req, res) => {
  try {
    // These queries are mocked for architecture purposes
    // const [studentsCount] = await db.execute('SELECT COUNT(*) as count FROM users WHERE role="student"');
    
    res.json({
      success: true,
      data: {
        activeStudents: 1248,
        monthlyRevenue: 420000,
        openTickets: 24,
        newQueries: 15,
        liveClassesToday: [
          { id: 1, subject: 'Physics', time: '10:00 AM', status: 'Live' },
          { id: 2, subject: 'Chemistry', time: '12:00 PM', status: 'Upcoming' }
        ],
        recentLeads: [
          { name: 'Rahul Sharma', source: 'Contact Form', time: '2 hrs ago' },
          { name: 'Priya Singh', source: 'Registration', time: '5 hrs ago' }
        ]
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get Finance Stats
// @route   GET /api/admin/finance
exports.getFinanceStats = async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        totalCollection: 425000,
        pendingDues: 115000,
        fullyPaidStudents: 452,
        transactions: [
          { id: '#TRX-901', student: 'Rahul Sharma', amount: 15000, status: 'Success' },
          { id: '#TRX-902', student: 'Priya Singh', amount: 20000, status: 'Success' }
        ]
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get All Students
// @route   GET /api/admin/students
exports.getAllStudents = async (req, res) => {
  try {
    // const [students] = await db.execute('SELECT * FROM users WHERE role="student"');
    res.json({
      success: true,
      data: [
        { id: '#STU-1024', name: 'Rahul Sharma', course: 'BBOSE 10th', status: 'Active' },
        { id: '#STU-1025', name: 'Priya Singh', course: 'NIOS 12th', status: 'Inactive' }
      ]
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.addStudent = async (req, res) => {
  res.status(201).json({ success: true, message: 'Student added successfully' });
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
