import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createMediaSet,
  getAllMediaSet,
  getMediaSetById,
  updateMediaSet,
  deleteMediaSet,
} from "../controllers/mediaSetController.js";

export const mediaSetRouter = Router();

mediaSetRouter.post("/media-set", authMiddleware, createMediaSet);
mediaSetRouter.get("/media-set", authMiddleware, getAllMediaSet);
mediaSetRouter.get("/media-set/:id", authMiddleware, getMediaSetById);
mediaSetRouter.put("/media-set/:id", updateMediaSet);
mediaSetRouter.delete("/media-set/:id", deleteMediaSet);
