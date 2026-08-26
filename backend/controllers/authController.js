const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Hash password before saving to DB
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Parameterized query to prevent SQL injection
    const [result] = await db.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Parameterized query
    const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    const user = users[0];
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate JWT
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
    
    res.json({ token, message: 'Logged in successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
};
