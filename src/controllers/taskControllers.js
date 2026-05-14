import { taskModel } from "../models/taskModel.js";

export const addTask = async (req, res) => {
  const { task } = req.body;

  try {
    if (!task) {
      return res.status(400).json({
        message: "Task is required",
      });
    }

    const newTask = await taskModel.create({
      task,
      user: req.user._id,
    });

    return res.status(201).json({
      message: "Task created successfully",
      data: newTask,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find({ user: req.user._id });

    return res.status(200).json({
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await taskModel.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server error",
    });
  }
};