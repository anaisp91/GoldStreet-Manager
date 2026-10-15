import { jest, describe, test, expect, beforeEach } from "@jest/globals";
import { authMiddleware } from "../src/middlewares/authMiddleware.js";
import jwt from "jsonwebtoken";

describe("authMiddleware", () => {
  beforeEach(() => {
    process.env.JWT_SECRET = "secreto-de-prueba";
  });

  test("responde 401 si no hay token", () => {
    const req = {
      headers: {},
    } as any;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Credenciales incorrectas",
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("token invalido", () => {
    const req = {
      headers: {
        authorization: "Bearer 987654322467888",
      },
    } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Credenciales invalidas",
    });
    expect(next).not.toHaveBeenCalled();
  });
  test("token valido y continua", () => {
    process.env.JWT_SECRET = "secreto-de-prueba";
    const token = jwt.sign(
      { id: "123", role: "artist" },
      process.env.JWT_SECRET,
    );
    const req = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    } as any;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    const next = jest.fn();

    authMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.user.id).toBe("123");
    expect(req.user.role).toBe("artist");
  });
  test("no hay jwtSecret", () => {
    delete process.env.JWT_SECRET;

    const req = {
      headers: {
        authorization: "Bearer token-falso",
      },
    } as any;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    const next = jest.fn();

    authMiddleware(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error en la configuración del servidor",
    });
  });
});
