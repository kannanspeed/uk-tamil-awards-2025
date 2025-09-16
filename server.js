const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname), {
  maxAge: '1d', // Cache static files for 1 day
  etag: true
}));

// Set proper MIME types for CSS and JS files
app.use('/styles.css', (req, res, next) => {
  res.setHeader('Content-Type', 'text/css');
  next();
});

app.use('/script.js', (req, res, next) => {
  res.setHeader('Content-Type', 'application/javascript');
  next();
});

// Handle client-side routing - serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`UK Tamil Awards 2025 website is running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});
