const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const initDB = async () => {
  try {
    const dbName = process.env.DB_NAME || 'aarambh_db';
    
    // First connect without database to create it if it doesn't exist
    let connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });
    
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`Database ${dbName} ensured.`);
    
    // Change to the database
    await connection.query(`USE \`${dbName}\``);

    console.log('Connected to MySQL Database.');

    // Create blog_categories table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS blog_categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category_name VARCHAR(100) NOT NULL,
        slug VARCHAR(100) NOT NULL UNIQUE
      )
    `);
    console.log('Table blog_categories created or already exists.');

    // Create blogs table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS blogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        content TEXT NOT NULL,
        short_description VARCHAR(500),
        featured_image VARCHAR(255),
        category_id INT,
        is_new ENUM('new', 'regular') DEFAULT 'regular',
        read_time INT DEFAULT 5,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES blog_categories(id) ON DELETE SET NULL
      )
    `);
    console.log('Table blogs created or already exists.');

    // Check if categories exist, if not seed some data
    const [categories] = await connection.execute('SELECT * FROM blog_categories');
    if (categories.length === 0) {
      await connection.execute(`
        INSERT INTO blog_categories (category_name, slug) VALUES 
        ('Exam Prep', 'exam-prep'),
        ('Study Tips', 'study-tips'),
        ('Career Guidance', 'career-guidance'),
        ('Success Stories', 'success-stories')
      `);
      console.log('Seeded blog_categories.');
    }

    // Check if blogs exist, if not seed dummy data
    const [blogs] = await connection.execute('SELECT * FROM blogs');
    if (blogs.length === 0) {
      const dummyContent = 'This is a detailed blog post content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
      await connection.execute(`
        INSERT INTO blogs (title, slug, content, short_description, featured_image, category_id, is_new, read_time) VALUES 
        ('Top 10 Strategies to Crack Competitive Exams in 2026', 'top-10-strategies-to-crack-competitive-exams-2026', ?, 'Discover the most effective strategies to prepare for competitive exams and ensure your success with our proven methodology.', 'bg2.jpg', 1, 'new', 8),
        ('How to Maintain Focus During Long Study Sessions', 'how-to-maintain-focus-during-long-study-sessions', ?, 'Learn practical techniques like the Pomodoro method and mindfulness to keep your concentration sharp during marathon study sessions.', 'bg3.jpg', 2, 'new', 5),
        ('Choosing the Right Career Path After 12th', 'choosing-the-right-career-path-after-12th', ?, 'A comprehensive guide for students navigating their career options after completing their 12th board exams.', 'bg4.jpg', 3, 'regular', 6),
        ('From Average to Topper: A Success Story', 'from-average-to-topper-a-success-story', ?, 'Read the inspiring journey of a student who transformed their academic performance through dedication and smart work.', 'bg5.jpg', 4, 'regular', 4)
      `, [dummyContent, dummyContent, dummyContent, dummyContent]);
      console.log('Seeded blogs.');
    }

    console.log('Database initialization completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

initDB();
