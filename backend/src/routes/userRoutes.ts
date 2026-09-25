import { Router } from "express";
import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

export const userRouter = Router();

userRouter.get("/users", authMiddleware, getUsers);
userRouter.post("/users", authMiddleware, createUser);
userRouter.get("/users/:id", authMiddleware, getUserById);
userRouter.put("/users/:id", authMiddleware, updateUser);
userRouter.delete("/users/:id", authMiddleware, deleteUser);
