import { Router } from "express";
import { login, register, getMe } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const authRouter = Router();

authRouter.post("/auth/login", login);
authRouter.post("/auth/register", register);
authRouter.get("/auth/me", authMiddleware, getMe);
