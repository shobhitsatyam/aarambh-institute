require('dotenv').config();
const mysql = require('mysql2/promise');

async function createTable() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Ravi@12345',
      database: process.env.DB_NAME || 'aarambh_db'
    });

    console.log('Connected to MySQL server.');

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS otp_rate_limits (
        email VARCHAR(100) PRIMARY KEY,
        attempts INT DEFAULT 1,
        last_attempt DATETIME,
        block_until DATETIME NULL
      )
    `;
    
    await connection.query(createTableQuery);
    console.log('otp_rate_limits table created or already exists.');

    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('Error creating table:', error);
    process.exit(1);
  }
}

createTable();
