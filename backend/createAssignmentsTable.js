require('dotenv').config();
const mysql = require('mysql2/promise');

async function createTables() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Ravi@12345',
      database: process.env.DB_NAME || 'aarambh_db'
    });

    console.log('Connected to MySQL server.');

    // Create assignments table
    const createAssignmentsTable = `
      CREATE TABLE IF NOT EXISTS assignments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        teacher_id INT NOT NULL,
        title VARCHAR(200) NOT NULL,
        subject VARCHAR(100) NOT NULL,
        due_date DATE NOT NULL,
        total_marks INT NOT NULL DEFAULT 100,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `;
    await connection.query(createAssignmentsTable);
    console.log('Assignments table created or already exists.');

    // Create assignment_submissions table
    const createSubmissionsTable = `
      CREATE TABLE IF NOT EXISTS assignment_submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        assignment_id INT NOT NULL,
        student_id INT NOT NULL,
        file_url VARCHAR(255) NOT NULL,
        marks_obtained INT,
        status ENUM('Pending', 'Graded') DEFAULT 'Pending',
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE,
        FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE KEY unique_submission (assignment_id, student_id)
      )
    `;
    await connection.query(createSubmissionsTable);
    console.log('Assignment Submissions table created or already exists.');

    console.log('Database updated successfully for Phase 2.');
    process.exit(0);
  } catch (error) {
    console.error('Database error:', error);
    process.exit(1);
  }
}

createTables();
