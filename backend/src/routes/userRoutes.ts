import { Router } from "express";
import { getUsers, createUser } from "../controllers/userController.js";

export const userRouter = Router();

userRouter.get("/users", getUsers);
userRouter.post("/users", createUser);
