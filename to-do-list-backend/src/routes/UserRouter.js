import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
} from "../controllers/UserController.js";
import { protect } from "../../authMiddleware.js";

const router = express.Router();

// Rotas públicas
router.post("/register", registerUser);
router.post("/login", loginUser);

// Rotas protegidas (só logado pode acessar)
router.get("/profile", protect, getProfile);

export default router;
