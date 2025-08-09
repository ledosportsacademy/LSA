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

// Import additional middleware
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "cdnjs.cloudflare.com", "cdn.jsdelivr.net"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "*.unsplash.com", "images.unsplash.com"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to all requests
app.use(limiter);

// Standard middleware
app.use(cors());
app.use(express.json({ limit: '1mb' })); // Limit payload size

// Only use morgan in development environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Add compression middleware to reduce payload size
const compression = require('compression');
app.use(compression());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://ledosportsacademy:I9R3MjfaSSYFXMKS@cluster0.l6exrot.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// MongoDB connection options for better performance
const mongoOptions = {
  maxPoolSize: 10, // Maintain up to 10 socket connections
  minPoolSize: 5,  // Maintain at least 5 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  family: 4 // Use IPv4, skip trying IPv6
};

mongoose.connect(MONGODB_URI, mongoOptions)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));
  
// Add connection error handling
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected, attempting to reconnect...');
});

mongoose.connection.on('reconnected', () => {
  console.log('MongoDB reconnected successfully');
});

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

// Serve static files from the frontend directory with caching
app.use(express.static(path.join(__dirname, 'frontend'), {
  maxAge: '1d', // Cache static assets for 1 day
  setHeaders: (res, path) => {
    // Set different cache times based on file type
    if (path.endsWith('.html')) {
      // Don't cache HTML files
      res.setHeader('Cache-Control', 'no-cache');
    } else if (path.endsWith('.css') || path.endsWith('.js')) {
      // Cache CSS and JS files for 1 day
      res.setHeader('Cache-Control', 'public, max-age=86400');
    } else if (path.match(/\.(jpg|jpeg|png|gif|ico|svg)$/)) {
      // Cache images for 7 days
      res.setHeader('Cache-Control', 'public, max-age=604800');
    }
  }
}));

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
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Start monitoring server in production
if (process.env.NODE_ENV === 'production' && process.env.ENABLE_MONITORING === 'true') {
  try {
    require('./monitor');
    console.log('Monitoring server started');
  } catch (err) {
    console.error('Failed to start monitoring server:', err);
  }
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});