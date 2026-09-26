import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import { stringify } from "node:querystring";

interface CreateUser {
  name: string;
  email: string;
  password: string;
  role: "artist";
  managerId: string;
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const { role, id } = req.user;
    if (role !== "manager" || !id) {
      return res.status(403).json({ message: "No autorizado" });
    }
    const allUsers = await User.find({
      managerId: id,
    });
    return res.json(allUsers);
  } catch (error) {
    res.status(500).json({ message: "Error al traer los usuarios" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Datos incompletos" });
    }
    const { role, id } = req.user;
    if (role !== "manager" || !id) {
      return res.status(403).json({ message: "No autorizado" });
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
      role: "artist",
      managerId: id,
    };
    const newUser = await User.create(user);
    return res.status(201).json({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      managerId: newUser.managerId,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear al usuario" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.params;
    const { role, id: managerId } = req.user;

    if (role !== "manager" || !managerId) {
      return res.status(403).json({ message: "Credenciales incorrectas" });
    }

    const user = await User.findOne({ _id: userId, managerId: managerId });
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
    const { id: userId } = req.params;
    const { role, id: managerId } = req.user;
    const { name, email, password } = req.body;

    if (role !== "manager" || !managerId) {
      return res.status(403).json({ message: "Credenciales invalidas" });
    }

    const updateObj: {
      name?: string;
      email?: string;
      password?: string;
    } = {};

    if (name) updateObj.name = name;
    if (email) updateObj.email = email;
    if (password) {
      const saltRounds = Number.parseInt(
        String(process.env.BCRYPT_SALT_ROUNDS ?? 10),
        10,
      );
      updateObj.password = await bcrypt.hash(password, saltRounds);
    }

    if (Object.keys(updateObj).length === 0) {
      return res.status(400).json({ message: "No hay cambiso que actualizar" });
    }

    const user = await User.findOneAndUpdate(
      { _id: userId, managerId: managerId },
      updateObj,
      {
        new: true,
      },
    );

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.json(user);
  } catch (error) {
    console.log("ERROR", error);
    return res.status(500).json({ message: "Error en la petición" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.params;
    const { role, id: managerId } = req.user;
    if (role !== "manager" || !managerId) {
      return res.status(403).json({ message: "Credenciales invalidas" });
    }
    const user = await User.findOneAndDelete({
      _id: userId,
      managerId: managerId,
    });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.status(200).json({ message: "Usuario borrado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error en la petición" });
  }
};
