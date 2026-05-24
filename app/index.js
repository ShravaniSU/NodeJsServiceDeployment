// ─────────────────────────────────────────────────────────
// Task Tracker API — Entry Point
// ─────────────────────────────────────────────────────────

const express = require('express');
const morgan = require('morgan');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ────────────────────────────────────────────
app.use(express.json());                    // Parse JSON request bodies
app.use(morgan('dev'));                     // Log requests to console

// ── Health Check ─────────────────────────────────────────
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Task Tracker API is running 🚀',
    version: '1.0.0',
  });
});

// ── Routes ───────────────────────────────────────────────
// All task-related endpoints live under /api/tasks
app.use('/api/tasks', taskRoutes);

// ── 404 Handler ──────────────────────────────────────────
// Catches any request that didn't match a route above
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.originalUrl} does not exist`,
  });
});

// ── Global Error Handler ─────────────────────────────────
// Express error-handling middleware (4 args required)
app.use((err, req, res, next) => {
  console.error('💥 Unhandled Error:', err.stack);
  res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: err.message || 'Something went wrong',
  });
});

// ── Start Server ─────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
  console.log(`📋 Task API available at http://localhost:${PORT}/api/tasks`);
});
