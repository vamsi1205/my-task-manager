const Task = require("../models/task.model");

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const { title, description, taskDate } = req.body;

    const task = await Task.create({
      userId: req.user.id,
      title,
      description,
      taskDate,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET TASKS BY DATE (Home page)
exports.getTasksByDate = async (req, res) => {
  try {
    const { date } = req.query;

    const filter = { userId: req.user.id };
    if (date) {
      filter.taskDate = date;
    }

    const tasks = await Task.find(filter).sort({ taskDate: -1, createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// MARK TASK COMPLETED
exports.markTaskCompleted = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { isCompleted: true },
      { new: true },
    );

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// RESET TASK
exports.resetTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { isCompleted: false },
      { new: true },
    );

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      req.body,
      { new: true },
    );

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
