require('dotenv').config();
const mysql = require('mysql2/promise');

async function run() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  await connection.query("UPDATE blogs SET featured_image = 'slider/1.jpg' WHERE id=1");
  await connection.query("UPDATE blogs SET featured_image = 'slider/2.jpg' WHERE id=2");
  await connection.query("UPDATE blogs SET featured_image = 'slider/3.jpg' WHERE id=3");
  await connection.query("UPDATE blogs SET featured_image = 'slider/1.jpg' WHERE id=4");
  
  console.log('Images updated successfully');
  process.exit(0);
}

run();
