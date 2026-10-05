const jwt = require('jsonwebtoken');
const db = require('../config/db');

const protect = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from "Bearer <token>"
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
  
  if (!process.env.JWT_SECRET) {
    console.error('Server configuration error: JWT_SECRET environment variable is missing.');
    return res.status(500).json({ error: 'Authentication service temporarily unavailable.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check Single Device Login (Session Token match)
    const [users] = await db.query('SELECT session_token FROM users WHERE id = ?', [decoded.id]);
    if (users.length === 0) {
      return res.status(401).json({ error: 'User no longer exists.' });
    }
    
    // If the token in DB is different from the token in JWT, they logged in elsewhere
    if (users[0].session_token && users[0].session_token !== decoded.session_token) {
      return res.status(401).json({ error: 'Session expired. You logged in from another device.' });
    }

    req.user = decoded; // Attach user info to request
    next();
  } catch (ex) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied. You do not have permission to access this resource.' });
    }
    next();
  };
};

module.exports = { protect, authorize };
