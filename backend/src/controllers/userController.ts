import type { Request, Response } from "express";
import bcrypt from "bcrypt";
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

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "El usuario no existe" });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error en la petición" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No hay cambis que actualizar" });
    }
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error en la petición" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.status(200).json({ message: "Usuario borrado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error en la petición" });
  }
};
