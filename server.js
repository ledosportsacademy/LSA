const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

// Import routes
const heroRoutes = require('./backend/routes/heroRoutes');
const activityRoutes = require('./backend/routes/activityRoutes');
const memberRoutes = require('./backend/routes/memberRoutes');
const donationRoutes = require('./backend/routes/donationRoutes');
const expenseRoutes = require('./backend/routes/expenseRoutes');
const experienceRoutes = require('./backend/routes/experienceRoutes');
const weeklyFeeRoutes = require('./backend/routes/weeklyFeeRoutes');
const galleryRoutes = require('./backend/routes/galleryRoutes');
const dashboardRoutes = require('./backend/routes/dashboardRoutes');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://ledosportsacademy:I9R3MjfaSSYFXMKS@cluster0.l6exrot.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/heroes', heroRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/weekly-fees', weeklyFeeRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Serve the main HTML file for all routes not handled by the API
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message || 'Server Error'
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});