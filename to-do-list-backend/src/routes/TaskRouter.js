import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/TaskController.js";
import { protect } from "../../authMiddleware.js";

const router = express.Router();

// Todas as rotas de task precisam estar protegidas
router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.get("/:id", protect, getTaskById);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

export default router;
