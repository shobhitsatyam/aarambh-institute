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

    await connection.end();
    console.log('Database initialization completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase();
