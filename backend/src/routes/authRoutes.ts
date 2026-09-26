import { Router } from "express";
import {
  login,
  register,
  getMe,
  updateMe,
  deleteMe,
} from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const authRouter = Router();

authRouter.post("/auth/login", login);
authRouter.post("/auth/register", register);
authRouter.get("/auth/me", authMiddleware, getMe);
authRouter.put("/auth/me", authMiddleware, updateMe);
authRouter.delete("/auth/me", authMiddleware, deleteMe);
