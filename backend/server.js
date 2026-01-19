require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const config = require('./config/config');
const errorHandler = require('./middleware/errorHandler');
const upload = require('./middleware/upload');

// Import routes
const artistRoutes = require('./routes/artists');
const releaseRoutes = require('./routes/releases');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create uploads directory if it doesn't exist
const uploadDir = config.uploadDir;
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve uploaded files statically
app.use('/uploads', express.static(uploadDir));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Music Distribution API',
    version: '1.0.0',
    endpoints: {
      artists: '/api/artists',
      releases: '/api/releases',
      upload: '/api/upload'
    }
  });
});

app.use('/api/artists', artistRoutes);
app.use('/api/releases', releaseRoutes);

// File upload endpoint
app.post('/api/upload', upload.single('audio'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: 'No file uploaded'
    });
  }

  res.json({
    success: true,
    data: {
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      url: `/uploads/${req.file.filename}`
    }
  });
});

// Config endpoint
app.get('/api/config', (req, res) => {
  res.json({
    success: true,
    data: {
      platforms: config.platforms,
      genres: config.genres
    }
  });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Music Distribution Backend running on port ${PORT}`);
  console.log(`Environment: ${config.nodeEnv}`);
  console.log(`Upload directory: ${config.uploadDir}`);
});

module.exports = app;
