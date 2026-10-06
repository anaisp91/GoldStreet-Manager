import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { uploadFiles } from "../middlewares/uploadMiddleware.js";
import {
  createMediaSet,
  getAllMediaSet,
  getMediaSetById,
  updateMediaSet,
  deleteMediaSet,
} from "../controllers/mediaSetController.js";

export const mediaSetRouter = Router();

mediaSetRouter.post("/media-set", authMiddleware, uploadFiles, createMediaSet);
mediaSetRouter.get("/media-set", authMiddleware, getAllMediaSet);
mediaSetRouter.get("/media-set/:id", authMiddleware, getMediaSetById);
mediaSetRouter.put("/media-set/:id", authMiddleware, updateMediaSet);
mediaSetRouter.delete("/media-set/:id", authMiddleware, deleteMediaSet);
