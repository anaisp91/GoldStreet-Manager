import { MediaSet } from "../models/mediaSetModel.js";
import type { Request, Response } from "express";
import { User } from "../models/userModel.js";
import type { MediaFile } from "../models/mediaSetModel.js";

export const createMediaSet = async (req: Request, res: Response) => {
  try {
    const { role, id: userId } = req.user;
    const { name, description, files } = req.body;

    if (role !== "artist" || !userId) {
      return res.status(403).json({ message: "Credenciales inválidas" });
    }
    if (!name || !files) {
      return res.status(400).json({ message: "Datos incompletos" });
    }
    const mediaSet = {
      name,
      description,
      files,
      artistId: userId,
    };
    const newMediaSet = await MediaSet.create(mediaSet);
    return res.status(201).json({
      name: newMediaSet.name,
      description: newMediaSet.description,
      files: newMediaSet.files,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error en la petición" });
  }
};

export const getAllMediaSet = async (req: Request, res: Response) => {
  try {
    const { role, id: userId } = req.user;
    if (!role || !userId) {
      return res.status(403).json({ message: "Credenciales inválidas" });
    }

    if (role === "artist") {
      const mediaSets = await MediaSet.find({ artistId: userId });
      return res.status(200).json(mediaSets);
    }
    if (role === "manager") {
      const artists = await User.find({ managerId: userId });
      const artistsId = artists.map((artist) => artist._id);
      const mediaSets = await MediaSet.find({ artistId: { $in: artistsId } });

      return res.status(200).json({ mediaSets });
    }
  } catch (error) {
    return res.status(500).json({ message: "error en la petición" });
  }
};

export const getMediaSetById = async (req: Request, res: Response) => {
  try {
    const { role, id: userId } = req.user;
    const { id } = req.params;

    if (!role || !userId) {
      return res.status(403).json({ message: "Credenciales inválidas" });
    }
    if (role === "artist") {
      const mediaSet = await MediaSet.findOne({ _id: id, artistId: userId });
      if (!mediaSet) {
        return res.status(404).json({ message: "MediaSet no encontrado" });
      }
      return res.status(200).json(mediaSet);
    }
    if (role === "manager") {
      const artists = await User.find({ managerId: userId });
      const artistId = artists.map((artist) => artist._id);
      const mediaSet = await MediaSet.findOne({
        _id: id,
        artistId: { $in: artistId },
      });
      if (!mediaSet) {
        return res.status(404).json({ message: "MediaSet no encontrado" });
      }
      return res.status(200).json(mediaSet);
    }
  } catch (error) {
    return res.status(500).json({ message: "Error en la petición" });
  }
};

export const updateMediaSet = async (req: Request, res: Response) => {
  try {
    const { role, id: userId } = req.user;
    const { id } = req.params;
    const { name, description, files, used } = req.body;

    if (!role || !userId) {
      return res.status(403).json({ message: "Credenciales inválidas" });
    }
    if (role === "artist") {
      const updateObj: {
        name?: string;
        description?: string;
        files?: MediaFile[];
      } = {};
      if (name) updateObj.name = name;
      if (description !== undefined) updateObj.description = description;
      if (files) updateObj.files = files;

      const mediaSet = await MediaSet.findOneAndUpdate(
        {
          _id: id,
          artistId: userId,
        },
        updateObj,
        { new: true },
      );
      if (!mediaSet) {
        return res.status(404).json({ message: "MediaSet no encontrado" });
      }
      return res.status(200).json(mediaSet);
    }
    if (role === "manager") {
      const updateObj: {
        used?: boolean;
      } = {};
      if (used !== undefined) updateObj.used = used;
      const artists = User.find({ managerId: userId });
      const artistId = (await artists).map((artist) => artist._id);
      const mediaSet = await MediaSet.findOneAndUpdate(
        { _id: id, artistId: { $in: artistId } },
        updateObj,
        { new: true },
      );
      if (!mediaSet) {
        return res.status(404).json({ message: "MediaSet no encontrado" });
      }
      return res.status(200).json(mediaSet);
    }
  } catch (error) {
    return res.status(500).json({ message: "Error en la petición" });
  }
};

export const deleteMediaSet = () => {};
