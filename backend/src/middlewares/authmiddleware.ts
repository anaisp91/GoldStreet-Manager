import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res
        .status(500)
        .json({ message: "Error en la configuración del servidor" });
    }
    const verifiedToken = jwt.verify(token, jwtSecret);
    if (typeof verifiedToken === "object" && verifiedToken !== null) {
      req.user = {
        id: verifiedToken.id,
        role: verifiedToken.role,
      };
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Credenciales invalidas" });
  }
};
