import type { MediaSet } from "../models/mediaSetModel.js";
import { v2 as cloudinary } from "cloudinary";

//*Función auxiliar de eliminacion de MediaSet, para usar en deleteMe y en deleteMediaSet
export const deleteMediaSetFiles = async (
  mediaSet: MediaSet,
): Promise<boolean> => {
  try {
    const deleteResults = await Promise.all(
      mediaSet.files.map((file) => cloudinary.uploader.destroy(file.publicId)),
    );
    const acceptedResults = deleteResults.every(
      (result) => result.result === "ok" || result.result === "not found",
    );
    return acceptedResults;
  } catch (error) {
    console.error("Error al eliminar fotografías de Cloudinary", error);
    return false;
  }
};
