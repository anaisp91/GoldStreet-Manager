import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { deleteMediaSetFiles } from "../utils/cloudinaryUtils.js";
import { MediaSet } from "../models/mediaSetModel.js";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({ message: "Datos incorrectos" });
    }
    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedName || !normalizedEmail || !password) {
      return res.status(400).json({ message: "Datos incompletos" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({ message: "Formato de emial inválido" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "La contraseña debe tener mínimo 6 caracteres" });
    }
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ message: "Usuario ya registrado" });
    }
    const saltRounds = Number.parseInt(
      String(process.env.BCRYPT_SALT_ROUNDS ?? 10),
    );
    const hashed = await bcrypt.hash(password, saltRounds);
    const user: User = {
      name: normalizedName,
      email: normalizedEmail,
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
    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({ message: "Datos inválidos" });
    }
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    const registeredUser = await User.findOne({
      email: normalizedEmail,
    }).select("+password");
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
    const { role, id } = req.user;
    if (!role || !id) {
      return res.status(403).json({ message: "Credenciales invalidas" });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usiario no encontrado" });
    }
    return res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        managerId: user.role === "artist" ? user.managerId : undefined,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Error en la peticion" });
  }
};

export const updateMe = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const { name, email, password } = req.body;

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No hay cambios que actualizar" });
    }

    if (
      (name !== undefined && typeof name !== "string") ||
      (email !== undefined && typeof email !== "string") ||
      (password !== undefined && typeof password !== "string")
    ) {
      return res.status(400).json({ message: "Datos inválidos" });
    }

    const normalizedName = name !== undefined ? name.trim() : undefined;
    if (normalizedName !== undefined && !normalizedName) {
      return res
        .status(400)
        .json({ message: "El nomrbre no puede estar vacío" });
    }
    const normalizedEmail =
      email !== undefined ? email.trim().toLowerCase() : undefined;
    if (normalizedEmail !== undefined && !normalizedEmail) {
      return res.status(400).json({ message: "El email no puede estar vacío" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (normalizedEmail !== undefined && !emailRegex.test(normalizedEmail)) {
      return res.status(400).json({ message: "Formato de email inválido" });
    }
    if (password !== undefined && password.length < 6) {
      return res
        .status(400)
        .json({ message: "La contraseña debe tener mínimo 6 caracteres" });
    }

    if (!id) {
      return res.status(403).json({ message: "Credenciales invalidas" });
    }

    if (normalizedEmail !== undefined) {
      const existingUser = await User.findOne({
        email: normalizedEmail,
        _id: { $ne: id },
      });
      if (existingUser) {
        return res.status(409).json({ message: "Email no disponible" });
      }
    }

    const updates: {
      name?: string;
      email?: string;
      password?: string;
    } = {};
    if (normalizedName) {
      updates.name = normalizedName;
    }
    if (normalizedEmail) {
      updates.email = normalizedEmail;
    }
    if (password) {
      const saltRound = Number.parseInt(
        String(process.env.BCRYPT_SALT_ROUNDS ?? 10),
        10,
      );
      updates.password = await bcrypt.hash(password, saltRound);
    }
    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        managerId: user.role === "artist" ? user.managerId : undefined,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Error en la petición" });
  }
};

export const deleteMe = async (req: Request, res: Response) => {
  let session: mongoose.ClientSession | undefined = undefined;
  let transactionStarted = false;
  try {
    session = await mongoose.startSession();
    const { role, id } = req.user;
    if (role !== "manager" || !id) {
      return res.status(403).json({ message: "Credenciales invalidas" });
    }

    const artists = await User.find({ managerId: id });
    const artistIds = artists.map((artist) => artist._id);

    const mediaSets = await MediaSet.find({ artistId: { $in: artistIds } });

    const deleteResults = await Promise.all(
      mediaSets.map((mediaSet) => deleteMediaSetFiles(mediaSet)),
    );
    if (!deleteResults.every((result) => result === true)) {
      return res
        .status(500)
        .json({ message: "Error en la eliminación de fotografías" });
    }
    session.startTransaction();
    transactionStarted = true;
    await MediaSet.deleteMany(
      {
        artistId: { $in: artistIds },
      },
      { session },
    );
    await User.deleteMany({ _id: { $in: artistIds } }, { session });
    const user = await User.findOneAndDelete({ _id: id, role }, { session });
    if (!user) {
      await session.abortTransaction();
      transactionStarted = false;
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    await session.commitTransaction();
    transactionStarted = false;
    return res.status(200).json({ message: "Usuario borrado corectamente" });
  } catch (error) {
    if (session && transactionStarted) await session.abortTransaction();
    return res.status(500).json({ message: "Error en la peticion" });
  } finally {
    if (session) await session.endSession();
  }
};
