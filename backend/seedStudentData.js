const mysql = require('mysql2/promise');
require('dotenv').config();

async function seedData() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Ravi@12345',
      database: process.env.DB_NAME || 'aarambh_db'
    });

    console.log('Connected to MySQL server for seeding.');

    // 1. Seed User (Student)
    // First, check if a user with ID 1 exists. If not, insert one.
    const [users] = await connection.execute('SELECT * FROM users WHERE id = 1');
    if (users.length === 0) {
      await connection.execute(`
        INSERT INTO users (id, full_name, mobile, email, board, class, password) 
        VALUES (1, 'Rahul Sharma', '9876543210', 'rahul@example.com', 'CBSE', '12th Science', 'hashedpassword')
      `);
      console.log('Inserted mock user (student).');
    }

    const studentId = 1;

    // 2. Seed Attendance
    await connection.execute('DELETE FROM attendance WHERE student_id = ?', [studentId]);
    const attendanceRecords = [
      [studentId, 'Advanced Physics (LIVE DB)', '2026-09-15', '10:00 AM', 'Present'],
      [studentId, 'Organic Chemistry (LIVE DB)', '2026-09-14', '12:00 PM', 'Absent'],
      [studentId, 'Calculus (LIVE DB)', '2026-09-13', '09:00 AM', 'Present'],
      [studentId, 'Genetics (LIVE DB)', '2026-09-12', '11:00 AM', 'Late']
    ];
    for (const record of attendanceRecords) {
      await connection.execute('INSERT INTO attendance (student_id, subject, date, time, status) VALUES (?, ?, ?, ?, ?)', record);
    }
    console.log('Seeded Attendance.');

    // 3. Seed Fees
    await connection.execute('DELETE FROM student_fees WHERE student_id = ?', [studentId]);
    await connection.execute('INSERT INTO student_fees (student_id, total_fee, paid_amount, pending_amount) VALUES (?, 45000, 15000, 30000)', [studentId]);
    
    await connection.execute('DELETE FROM fee_installments WHERE student_id = ?', [studentId]);
    const installments = [
      [studentId, 15000, '2026-08-15', 'Paid', 'REC-00124'],
      [studentId, 15000, '2026-11-15', 'Pending', null],
      [studentId, 15000, '2027-02-15', 'Pending', null]
    ];
    for (const inst of installments) {
      await connection.execute('INSERT INTO fee_installments (student_id, amount, due_date, status, receipt_no) VALUES (?, ?, ?, ?, ?)', inst);
    }
    console.log('Seeded Fees.');

    // 4. Seed Classes (Calendar)
    await connection.execute('TRUNCATE TABLE classes'); // Assuming we want to clear classes
    const classes = [
      ['Physics', 'Kinematics Revision', 'Prof. Sharma', '2026-09-16 10:00:00', '2 Hours', 'Upcoming', 'https://zoom.us/j/123456789', '/thumbnails/physics.jpg'],
      ['Chemistry', 'Organic Chemistry Basics', 'Dr. Singh', '2026-09-15 14:00:00', '1.5 Hours', 'Live', 'https://zoom.us/j/987654321', '/thumbnails/chem.jpg'],
      ['Mathematics', 'Calculus Integration', 'Mr. Gupta', '2026-09-14 09:00:00', '2 Hours', 'Recorded', 'https://example.com/recording/math', '/thumbnails/math.jpg']
    ];
    for (const cls of classes) {
      await connection.execute('INSERT INTO classes (subject, topic, instructor, schedule_time, duration, status, link, thumbnail) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', cls);
    }
    console.log('Seeded Classes.');

    // 5. Seed Notifications
    await connection.execute('DELETE FROM notifications WHERE student_id = ?', [studentId]);
    const notifications = [
      [studentId, 'bullhorn', 'Holiday Announcement', 'Institute will remain closed tomorrow due to heavy rain.', true],
      [studentId, 'wallet', 'Fee Payment Reminder', 'Your 2nd installment of ₹15,000 is due on Nov 15.', false]
    ];
    for (const notif of notifications) {
      await connection.execute('INSERT INTO notifications (student_id, type, title, message, is_new) VALUES (?, ?, ?, ?, ?)', notif);
    }
    console.log('Seeded Notifications.');

    // 6. Seed Tickets
    await connection.execute('DELETE FROM tickets WHERE student_id = ?', [studentId]);
    const tickets = [
      ['#TKT-1024', studentId, 'Technical Issue', 'App crashes on iOS 16', 'App keeps crashing when I open the recorded lectures section.', 'Open'],
      ['#TKT-1025', studentId, 'Study Material', 'Missing Chapter 4 PDF', 'The PDF for Chemistry Chapter 4 is not available in the portal.', 'Resolved']
    ];
    for (const tkt of tickets) {
      await connection.execute('INSERT INTO tickets (ticket_id, student_id, category, subject, description, status) VALUES (?, ?, ?, ?, ?, ?)', tkt);
    }
    console.log('Seeded Tickets.');

    await connection.end();
    console.log('Data seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seedData();
