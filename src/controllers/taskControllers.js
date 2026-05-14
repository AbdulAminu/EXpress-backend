import Task from "../models/taskModels.js"; // adjust if needed

export const addTask = async (req, res) => {
  try {
    const { task } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!task) {
      return res.status(400).json({ message: "Task is required" });
    }

    const newTask = await Task.create({
      task,
      userId: req.user._id,
    });

    return res.status(201).json({
      message: "Task created successfully",
      data: newTask,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getTasks = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const tasks = await Task.find({ userId: req.user._id });

    return res.status(200).json({
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};