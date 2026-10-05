require('dotenv').config();
const mysql = require('mysql2/promise');

async function initializeDatabase() {
  let connection;

  try {
    // Connect to MySQL server
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3307,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });

    console.log('Connected to MySQL server.');

    const databaseName = process.env.DB_NAME || 'aarambh_db';

    // Create database
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${databaseName}\``
    );

    console.log(`${databaseName} database created or already exists.`);

    // Switch to database
    await connection.query(`USE \`${databaseName}\``);

    // ==========================================
    // USERS TABLE
    // ==========================================

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

    // ==========================================
    // OTPs TABLE
    // ==========================================

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

    // ==========================================
    // OTP RATE LIMITS TABLE
    // ==========================================

    const createOtpRateLimitsTable = `
      CREATE TABLE IF NOT EXISTS otp_rate_limits (
        email VARCHAR(100) NOT NULL PRIMARY KEY,
        attempts INT NOT NULL DEFAULT 0,
        last_attempt DATETIME NOT NULL,
        block_until DATETIME DEFAULT NULL
      )
    `;

    await connection.query(createOtpRateLimitsTable);
    console.log('OTP Rate Limits table created or already exists.');

    // ==========================================
    // ATTENDANCE TABLE
    // ==========================================

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

    // ==========================================
    // STUDENT FEES TABLE
    // ==========================================

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

    // ==========================================
    // FEE INSTALLMENTS TABLE
    // ==========================================

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

    // ==========================================
    // TICKETS TABLE
    // ==========================================

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

    // ==========================================
    // DOUBTS TABLE
    // ==========================================

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

    // ==========================================
    // PROGRAM CHANGE REQUESTS TABLE
    // ==========================================

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

    // ==========================================
    // NOTIFICATIONS TABLE
    // ==========================================

    const createNotificationsTable = `
      CREATE TABLE IF NOT EXISTS notifications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT DEFAULT NULL,
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

    // ==========================================
    // FEEDBACK TABLE
    // ==========================================

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

    // ==========================================
    // CLASSES TABLE
    // ==========================================

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

    // ==========================================
    // STUDY MATERIALS TABLE
    // ==========================================

    const createStudyMaterialsTable = `
      CREATE TABLE IF NOT EXISTS study_materials (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        type VARCHAR(50) NOT NULL,
        course VARCHAR(100) NOT NULL,
        size VARCHAR(50),
        is_free BOOLEAN DEFAULT TRUE,
        price DECIMAL(10, 2) DEFAULT 0.00,
        file_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await connection.query(createStudyMaterialsTable);
    console.log('Study Materials table created or already exists.');

    // ==========================================
    // PURCHASED MATERIALS TABLE
    // ==========================================

    const createPurchasedMaterialsTable = `
      CREATE TABLE IF NOT EXISTS purchased_materials (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT NOT NULL,
        material_id INT NOT NULL,
        amount_paid DECIMAL(10, 2) NOT NULL,
        purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (material_id) REFERENCES study_materials(id) ON DELETE CASCADE,
        UNIQUE KEY unique_purchase (student_id, material_id)
      )
    `;

    await connection.query(createPurchasedMaterialsTable);
    console.log('Purchased Materials table created or already exists.');

    // ==========================================
    // COURSES TABLE
    // ==========================================

    const createCoursesTable = `
      CREATE TABLE IF NOT EXISTS courses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        duration VARCHAR(100),
        is_free BOOLEAN DEFAULT TRUE,
        price DECIMAL(10, 2) DEFAULT 0.00,
        includes_live_classes BOOLEAN DEFAULT FALSE,
        includes_recorded_classes BOOLEAN DEFAULT FALSE,
        thumbnail VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await connection.query(createCoursesTable);
    console.log('Courses table created or already exists.');

    // ==========================================
    // PURCHASED COURSES TABLE
    // ==========================================

    const createPurchasedCoursesTable = `
      CREATE TABLE IF NOT EXISTS purchased_courses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT NOT NULL,
        course_id INT NOT NULL,
        price_paid DECIMAL(10, 2) DEFAULT 0.00,
        purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES users(id),
        FOREIGN KEY (course_id) REFERENCES courses(id)
      )
    `;

    await connection.query(createPurchasedCoursesTable);
    console.log('Purchased Courses table created or already exists.');

    // ==========================================
    // EXAMS TABLE
    // ==========================================

    const createExamsTable = `
      CREATE TABLE IF NOT EXISTS exams (
        id INT AUTO_INCREMENT PRIMARY KEY,
        exam_id VARCHAR(50) NOT NULL,
        title VARCHAR(255) NOT NULL,
        course VARCHAR(100) NOT NULL,
        exam_date DATE NOT NULL,
        exam_time VARCHAR(50) NOT NULL,
        status VARCHAR(50) DEFAULT 'Scheduled',
        students INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await connection.query(createExamsTable);
    console.log('Exams table created or already exists.');

    console.log('Database initialization completed successfully.');

    await connection.end();
    process.exit(0);

  } catch (error) {
    console.error('Error initializing database:', error);

    if (connection) {
      await connection.end();
    }

    process.exit(1);
  }
}

initializeDatabase();