import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Datos incompletos" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Usruario ya regsitrado" });
    }
    const saltRounds = Number.parseInt(
      String(process.env.BCRYPT_SALT_ROUNDS ?? 10),
    );
    const hashed = await bcrypt.hash(password, saltRounds);
    const user: User = {
      name,
      email,
      password: hashed,
      role: "manager",
    };
    const newUser = await User.create(user);
    return res.status(201).json({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error en la petición" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    const registeredUser = await User.findOne({ email }).select("+password");
    if (!registeredUser) {
      return res.status(401).json({ message: "Credenciales invalidas" });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      registeredUser.password,
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credenciales invalidas" });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res
        .status(500)
        .json({ message: "Error de configuración del servidor" });
    }

    const token = jwt.sign(
      {
        id: registeredUser._id,
        role: registeredUser.role,
      },
      jwtSecret,
      {
        expiresIn: "1h",
      },
    );

    return res.json({
      token,
      user: {
        id: registeredUser._id,
        name: registeredUser.name,
        email: registeredUser.email,
        role: registeredUser.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    console.log(req.user);
    const { role, id } = req.user;
    if (role !== "manager" || !id) {
      return res.status(403).json({ message: "Credenciales invalidas" });
    }
    const managerUser = await User.findOne({ _id: id, role: "manager" });
    if (!managerUser) {
      return res.status(404).json({ message: "Manager no encontrado" });
    }
    return res.status(200).json({ managerUser });
  } catch (error) {
    return res.status(500).json({ message: "Error en la peticion" });
  }
};

export const updateMe = async (req: Request, res: Response) => {
  try {
    const { role, id } = req.user;
    const { name, email, password } = req.body;
    if (role !== "manager" || !id) {
      return res.status(403).json({ messahe: "Credenciales invalidas" });
    }
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No hay cambios que actualizar" });
    }
    const updates: {
      name?: string;
      email?: string;
      password?: string;
    } = {};
    if (name) {
      updates.name = name;
    }
    if (email) {
      updates.email = email;
    }
    if (password) {
      const saltRound = Number.parseInt(
        String(process.env.BCRYPT_SALT_ROUNDS ?? 10),
      );
      updates.password = await bcrypt.hash(password, saltRound);
    }
    const managerUser = await User.findOneAndUpdate(
      { _id: id, role: "manager" },
      updates,
      { new: true },
    );
    if (!managerUser) {
      return res.status(404).json({ maessage: "Manager no encontrado" });
    }
    return res.status(200).json(managerUser);
  } catch (error) {
    return res.status(500).json({ message: "Error en la petición" });
  }
};
