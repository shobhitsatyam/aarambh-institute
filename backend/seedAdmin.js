require('dotenv').config();
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

async function seedAdmin() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Ravi@12345',
      database: process.env.DB_NAME || 'aarambh_db'
    });

    // Try to add role column if it doesn't exist
    try {
      await connection.query(`ALTER TABLE users ADD COLUMN role VARCHAR(20) DEFAULT 'student'`);
      console.log('Added role column to users table.');
    } catch (e) {
      if (e.code === 'ER_DUP_FIELDNAME') {
        console.log('Role column already exists.');
      } else {
        throw e;
      }
    }

    // Check if admin exists
    const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', ['admin@aarambh.com']);
    if (rows.length === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await connection.query(
        'INSERT INTO users (full_name, mobile, email, board, class, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
        ['Super Admin', '9999999999', 'admin@aarambh.com', 'Admin', 'Admin', hashedPassword, 'admin']
      );
      console.log('Admin user created (admin@aarambh.com / admin123).');
    } else {
      console.log('Admin user already exists.');
      // ensure it has admin role
      await connection.query('UPDATE users SET role = "admin" WHERE email = "admin@aarambh.com"');
    }

    await connection.end();
    console.log('Admin seeding completed.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding admin:', err);
    process.exit(1);
  }
}

seedAdmin();
