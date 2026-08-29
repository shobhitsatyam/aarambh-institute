const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Configure this later for specific domains to improve security
app.use(express.json());

const contactRoutes = require('./routes/contactRoutes');
const apiRoutes = require('./routes/apiRoutes');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
