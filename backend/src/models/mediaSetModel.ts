import mongoose from "mongoose";

export interface MediaSet {
  name: string;
  description?: string;
  artistId: mongoose.Types.ObjectId;
  used: boolean;
  files: MediaFile[];
}
export interface MediaFile {
  url: string;
  publicId: string;
}

const mediaSetSchema = new mongoose.Schema<MediaSet>({
  name: { type: String, required: true },
  description: { type: String },
  artistId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  used: { type: Boolean, default: false },
  files: {
    type: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
      },
    ],
    validate: {
      validator: (files: MediaFile[]) => files.length > 0,
      message: "El conjunto debe tener al menos una foto",
    },
  },
});
export const MediaSet = mongoose.model<MediaSet>("MediaSet", mediaSetSchema);
