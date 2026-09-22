import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

interface CreateUser {
  name: string;
  email: string;
  password: string;
  role: "artist" | "manager";
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find();
    return res.json(allUsers);
  } catch (error) {
    res.status(500).json({ message: "Error al traer los usuarios" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Datos incompletos" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Usuario ya registrado" });
    }

    const saltRounds = Number.parseInt(
      String(process.env.BCRYPT_SALT_ROUNDS ?? 10),
      10,
    );

    const hashed = await bcrypt.hash(password, saltRounds);
    const user: CreateUser = {
      name,
      email,
      password: hashed,
      role,
    };
    const newUser = await User.create(user);
    return res.status(201).json({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear al usuario" });
  }
};
