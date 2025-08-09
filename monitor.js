const express = require('express');
const os = require('os');
const v8 = require('v8');
const process = require('process');

// Create a separate Express app for monitoring
const monitorApp = express();
const PORT = process.env.MONITOR_PORT || 3001;

// Basic authentication middleware
const basicAuth = (req, res, next) => {
  // Get auth header value
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    res.setHeader('WWW-Authenticate', 'Basic');
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  // Verify auth credentials
  const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  const user = auth[0];
  const pass = auth[1];
  
  if (user === 'admin' && pass === process.env.ADMIN_PASSWORD) {
    return next();
  }
  
  res.setHeader('WWW-Authenticate', 'Basic');
  return res.status(401).json({ error: 'Authentication failed' });
};

// Apply authentication to all routes
monitorApp.use(basicAuth);

// System information endpoint
monitorApp.get('/api/system', (req, res) => {
  const systemInfo = {
    hostname: os.hostname(),
    platform: os.platform(),
    arch: os.arch(),
    cpus: os.cpus().length,
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    uptime: os.uptime(),
    loadAvg: os.loadavg(),
  };
  
  res.json(systemInfo);
});

// Node.js process information
monitorApp.get('/api/process', (req, res) => {
  const processInfo = {
    pid: process.pid,
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    cpuUsage: process.cpuUsage(),
    resourceUsage: process.resourceUsage(),
    versions: process.versions,
  };
  
  res.json(processInfo);
});

// V8 heap statistics
monitorApp.get('/api/heap', (req, res) => {
  const heapStats = v8.getHeapStatistics();
  res.json(heapStats);
});

// Start the monitoring server
monitorApp.listen(PORT, () => {
  console.log(`Monitoring server running on port ${PORT}`);
});

module.exports = monitorApp;