const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

// Create
router.post("/", taskController.createTask);

// Get by date
router.get("/", taskController.getTasksByDate);

// Complete task
router.patch("/:id/complete", taskController.markTaskCompleted);

// Reset task
router.patch("/:id/reset", taskController.resetTask);

// Update
router.put("/:id", taskController.updateTask);

// Delete
router.delete("/:id", taskController.deleteTask);

module.exports = router;
