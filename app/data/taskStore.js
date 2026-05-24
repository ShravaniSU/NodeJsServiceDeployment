// ─────────────────────────────────────────────────────────
// In-Memory Task Store
// ─────────────────────────────────────────────────────────
// ⚠️ Data is lost when the server restarts.
//    This is fine for development & learning.
// ─────────────────────────────────────────────────────────

const { v4: uuidv4 } = require('uuid');

// ── The "Database" ───────────────────────────────────────
let tasks = [];

// ── Helper Functions ─────────────────────────────────────

/**
 * Create a new task and add it to the store.
 * @param {string} title - The task title (required)
 * @param {string} [description=''] - Optional description
 * @returns {object} The newly created task
 */
function createTask(title, description = '') {
  const newTask = {
    id: uuidv4(),
    title,
    description,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  return newTask;
}

/**
 * Find a task by its ID.
 * @param {string} id
 * @returns {object|undefined}
 */
function findTaskById(id) {
  return tasks.find((task) => task.id === id);
}

/**
 * Update a task by its ID.
 * @param {string} id
 * @param {object} updates - Fields to update (title, description, completed)
 * @returns {object|null} The updated task, or null if not found
 */
function updateTaskById(id, updates) {
  const task = findTaskById(id);
  if (!task) return null;

  if (updates.title !== undefined) {
    task.title = updates.title;
  }
  if (updates.description !== undefined) {
    task.description = updates.description;
  }
  if (updates.completed !== undefined) {
    task.completed = !!updates.completed;
  }

  return task;
}

/**
 * Delete a task by its ID.
 * @param {string} id
 * @returns {object|null} The deleted task, or null if not found
 */
function deleteTaskById(id) {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return null;
  const [deleted] = tasks.splice(index, 1);
  return deleted;
}

/**
 * Get all tasks.
 * @returns {object[]}
 */
function getAllTasks() {
  return tasks;
}

module.exports = {
  tasks,
  createTask,
  findTaskById,
  updateTaskById,
  deleteTaskById,
  getAllTasks,
};
