const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory user storage (Replace with database in production)
const users = [];
const sessions = {};

// Auth Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Advisor Routes
const advisorRoutes = require('./routes/advisor');
app.use('/api/advisor', advisorRoutes);

// Soil Analysis Routes
const soilRoutes = require('./routes/soil');
app.use('/api/soil', soilRoutes);

// Crop Analysis Routes
const cropRoutes = require('./routes/crop');
app.use('/api/crop', cropRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running', timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`FarmWise Backend running on port ${PORT}`);
});

module.exports = { app, users, sessions };
