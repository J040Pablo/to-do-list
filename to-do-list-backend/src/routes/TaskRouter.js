import express from "express";
import { protect } from "../../authMiddleware.js";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/TaskController.js";

const router = express.Router();

router.post("/", protect, createTask); // Adicionar task
router.get("/", protect, getTasks); // Listar todas as tasks
router.put("/:id", protect, updateTask); // Editar task
router.delete("/:id", protect, deleteTask); // Deletar task

export default router;
