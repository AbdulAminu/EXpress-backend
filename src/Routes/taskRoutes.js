import express from "express";
import {
  addTask,
  getTasks,
  deleteTask,
} from "../controllers/taskControllers.js";

import { checkToken } from "../middleware/midwareAuth.js";

const router = express.Router();

router.post("/addTask", checkToken, addTask);
router.get("/getTasks", checkToken, getTasks);
router.delete("/deleteTask/:id", checkToken, deleteTask);

export default router;