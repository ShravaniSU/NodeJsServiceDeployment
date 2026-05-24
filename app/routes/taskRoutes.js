// ─────────────────────────────────────────────────────────
// Task Routes — /api/tasks
// ─────────────────────────────────────────────────────────

const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  findTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
} = require('../data/taskStore');

// GET    /api/tasks        → Fetch all tasks
router.get('/', (req, res) => {
  const tasks = getAllTasks();
  res.status(200).json({
    count: tasks.length,
    tasks,
  });
});

// GET    /api/tasks/:id    → Fetch a single task by ID
router.get('/:id', (req, res) => {
  const task = findTaskById(req.params.id);
  if (!task) {
    return res.status(404).json({
      error: 'Not Found',
      message: `Task with id '${req.params.id}' not found`,
    });
  }
  res.status(200).json(task);
});

// POST   /api/tasks        → Create a new task
router.post('/', (req, res) => {
  const { title, description } = req.body;

  // Validation: title is required
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Title is required and must be a non-empty string',
    });
  }

  const newTask = createTask(title.trim(), description || '');
  res.status(201).json(newTask);
});

// PUT    /api/tasks/:id    → Update an existing task
router.put('/:id', (req, res) => {
  const { title, description, completed } = req.body;

  // Validation: title cannot be empty if provided
  if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Title must be a non-empty string if provided',
    });
  }

  // Check if at least one field is provided for update
  if (title === undefined && description === undefined && completed === undefined) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'At least one field to update (title, description, completed) must be provided',
    });
  }

  const updatedTask = updateTaskById(req.params.id, {
    title: title ? title.trim() : undefined,
    description,
    completed,
  });

  if (!updatedTask) {
    return res.status(404).json({
      error: 'Not Found',
      message: `Task with id '${req.params.id}' not found`,
    });
  }

  res.status(200).json(updatedTask);
});

// DELETE /api/tasks/:id    → Delete a task
router.delete('/:id', (req, res) => {
  const deletedTask = deleteTaskById(req.params.id);
  if (!deletedTask) {
    return res.status(404).json({
      error: 'Not Found',
      message: `Task with id '${req.params.id}' not found`,
    });
  }

  res.status(200).json({
    message: `Task '${req.params.id}' deleted successfully`,
    task: deletedTask,
  });
});

module.exports = router;
