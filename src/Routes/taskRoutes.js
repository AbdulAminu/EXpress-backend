import express from "express";
import {
  addTask,
  getTasks,
  deleteTask,
} from "../controllers/taskController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/addTask", authMiddleware, addTask);
router.get("/getTasks", authMiddleware, getTasks);
router.delete("/deleteTask/:id", authMiddleware, deleteTask);

export default router;