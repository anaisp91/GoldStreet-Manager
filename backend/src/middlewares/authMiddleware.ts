import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({ message: "Credenciales invalidas" });
    }
    if (!authorization.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }
    const token = authorization.split(" ")[1];

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
    } else {
      return res.status(401).json({ message: "token inválido" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Credenciales invalidas" });
  }
};
