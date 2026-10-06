import { MediaSet } from "../models/mediaSetModel.js";
import type { Request, Response } from "express";
import { User } from "../models/userModel.js";
import type { MediaFile } from "../models/mediaSetModel.js";
import { v2 as cloudinary } from "cloudinary";

//Create conectado a Cloudinary
export const createMediaSet = async (req: Request, res: Response) => {
  try {
    const { role, id: userId } = req.user;
    const { name, description } = req.body;
    const files = req.files as Express.Multer.File[];

    if (role !== "artist" || !userId) {
      return res.status(403).json({ message: "Credenciales inválidas" });
    }

    if (!name || !files || files.length === 0) {
      return res.status(400).json({ message: "Datos incompletos" });
    }
    //Funcion auxiliar que recibe buffer y promete devolver Mediafile
    const uploadToCloudinary = (buffer: Buffer): Promise<MediaFile> => {
      //Creamos la Promesa
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {},
          (error, result) => {
            if (error || !result) {
              reject(error);
              return;
            }

            resolve({
              //Cloudinary nos devuelve secure_url,
              // la transformamos a url en formato de nuestra interfaz.
              url: result.secure_url,
              publicId: result.public_id,
            });
          },
        );
        //Mandamos el buffer
        stream.end(buffer);
      });
    };
    //Por cada archivo, recoge el buffer y lo dube a Cloudinary
    //Cada archivo crea una Promise, Promise.all, espera a que terminen todas
    const filesUploaded = await Promise.all(
      files.map((file) => uploadToCloudinary(file.buffer)),
    );

    const mediaSet = {
      name,
      description,
      files: filesUploaded,
      artistId: userId,
    };

    const newMediaSet = await MediaSet.create(mediaSet);

    return res.status(201).json(newMediaSet);
  } catch (error) {
    console.error(error);
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
    const { name, description, used } = req.body;

    if (!role || !userId) {
      return res.status(403).json({ message: "Credenciales inválidas" });
    }
    if (role === "artist") {
      const updateObj: {
        name?: string;
        description?: string;
      } = {};
      if (name) updateObj.name = name;
      if (description !== undefined) updateObj.description = description;

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

export const deleteMediaSet = async (req: Request, res: Response) => {
  try {
    const { role, id: userId } = req.user;
    const { id } = req.params;

    if (!role || !userId) {
      return res.status(403).json({ message: "Credenciales inválidas" });
    }
    if (role === "manager") {
      return res.status(403).json({ message: "Credenciales inválidas" });
    }

    const mediaSet = await MediaSet.findOne({
      _id: id,
      artistId: userId,
    });
    if (!mediaSet) {
      return res.status(404).json({ message: "MediaSet no encontrado" });
    }
    await Promise.all(
      mediaSet.files.map((file) => cloudinary.uploader.destroy(file.publicId)),
    );
    await MediaSet.findByIdAndDelete(id);
    return res.status(200).json({ message: "MediaSet borrado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error en la petición" });
  }
};
