require('dotenv').config();
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

async function seedTeacher() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', ['teacher@aarambh.com']);
    if (rows.length === 0) {
      const hashedPassword = await bcrypt.hash('teacher123', 10);
      await connection.query(
        'INSERT INTO users (full_name, mobile, email, board, class, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
        ['R.K. Sharma', '8888888888', 'teacher@aarambh.com', 'Faculty', 'Physics', hashedPassword, 'teacher']
      );
      console.log('Teacher user created (teacher@aarambh.com / teacher123).');
    } else {
      console.log('Teacher user already exists.');
    }

    await connection.end();
    console.log('Teacher seeding completed.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding teacher:', err);
    process.exit(1);
  }
}

seedTeacher();
