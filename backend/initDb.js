require('dotenv').config();
const mysql = require('mysql2/promise');

async function initializeDatabase() {
  try {
    // Connect without database to create it if it doesn't exist
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Ravi@12345'
    });

    console.log('Connected to MySQL server.');

    // Create database
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'aarambh_db'}\``);
    console.log(`Database aarambh_db created or already exists.`);

    // Switch to database
    await connection.query(`USE \`${process.env.DB_NAME || 'aarambh_db'}\``);

    // Create users table
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(100) NOT NULL,
        mobile VARCHAR(15) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        board VARCHAR(50) NOT NULL,
        class VARCHAR(50) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await connection.query(createUsersTable);
    console.log('Users table created or already exists.');

    // Create otps table
    const createOtpsTable = `
      CREATE TABLE IF NOT EXISTS otps (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(100) NOT NULL,
        otp VARCHAR(6) NOT NULL,
        expires_at DATETIME NOT NULL,
        type VARCHAR(20) NOT NULL
      )
    `;
    await connection.query(createOtpsTable);
    console.log('OTPs table created or already exists.');

    // Create attendance table
    const createAttendanceTable = `
      CREATE TABLE IF NOT EXISTS attendance (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT NOT NULL,
        subject VARCHAR(100) NOT NULL,
        date DATE NOT NULL,
        time VARCHAR(20) NOT NULL,
        status ENUM('Present', 'Absent', 'Late') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `;
    await connection.query(createAttendanceTable);
    console.log('Attendance table created or already exists.');

    // Create student_fees table
    const createStudentFeesTable = `
      CREATE TABLE IF NOT EXISTS student_fees (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT NOT NULL,
        total_fee DECIMAL(10, 2) NOT NULL,
        paid_amount DECIMAL(10, 2) DEFAULT 0,
        pending_amount DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `;
    await connection.query(createStudentFeesTable);
    console.log('Student Fees table created or already exists.');

    // Create fee_installments table
    const createFeeInstallmentsTable = `
      CREATE TABLE IF NOT EXISTS fee_installments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        due_date DATE NOT NULL,
        status ENUM('Paid', 'Pending', 'Overdue') DEFAULT 'Pending',
        receipt_no VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `;
    await connection.query(createFeeInstallmentsTable);
    console.log('Fee Installments table created or already exists.');

    // Create tickets table
    const createTicketsTable = `
      CREATE TABLE IF NOT EXISTS tickets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ticket_id VARCHAR(20) NOT NULL UNIQUE,
        student_id INT NOT NULL,
        category VARCHAR(50) NOT NULL,
        subject VARCHAR(200) NOT NULL,
        description TEXT NOT NULL,
        status ENUM('Open', 'In Progress', 'Resolved', 'Closed') DEFAULT 'Open',
        last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `;
    await connection.query(createTicketsTable);
    console.log('Tickets table created or already exists.');

    // Create doubts table
    const createDoubtsTable = `
      CREATE TABLE IF NOT EXISTS doubts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT NOT NULL,
        subject VARCHAR(100) NOT NULL,
        topic VARCHAR(100) NOT NULL,
        question TEXT NOT NULL,
        status ENUM('Pending', 'Answered', 'In Live Class') DEFAULT 'Pending',
        answer TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `;
    await connection.query(createDoubtsTable);
    console.log('Doubts table created or already exists.');

    // Create program_change_requests table
    const createProgramChangeRequestsTable = `
      CREATE TABLE IF NOT EXISTS program_change_requests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT NOT NULL,
        current_program VARCHAR(100) NOT NULL,
        new_program VARCHAR(100) NOT NULL,
        reason TEXT NOT NULL,
        status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `;
    await connection.query(createProgramChangeRequestsTable);
    console.log('Program Change Requests table created or already exists.');

    // Create notifications table
    const createNotificationsTable = `
      CREATE TABLE IF NOT EXISTS notifications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT, -- NULL means broadcast to all
        type VARCHAR(50) NOT NULL,
        title VARCHAR(200) NOT NULL,
        message TEXT NOT NULL,
        is_new BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `;
    await connection.query(createNotificationsTable);
    console.log('Notifications table created or already exists.');

    // Create feedback table
    const createFeedbackTable = `
      CREATE TABLE IF NOT EXISTS feedback (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT NOT NULL,
        rating INT NOT NULL,
        category VARCHAR(100) NOT NULL,
        related_teacher VARCHAR(100),
        feedback_text TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `;
    await connection.query(createFeedbackTable);
    console.log('Feedback table created or already exists.');

    // Create classes table
    const createClassesTable = `
      CREATE TABLE IF NOT EXISTS classes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        subject VARCHAR(100) NOT NULL,
        topic VARCHAR(200) NOT NULL,
        instructor VARCHAR(100) NOT NULL,
        schedule_time DATETIME NOT NULL,
        duration VARCHAR(50),
        status ENUM('Live', 'Upcoming', 'Recorded') NOT NULL,
        link VARCHAR(255),
        thumbnail VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await connection.query(createClassesTable);
    console.log('Classes table created or already exists.');

    await connection.end();
    console.log('Database initialization completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase();
