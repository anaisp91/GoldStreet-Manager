import mongoose from "mongoose";

export interface User {
  name: string;
  email: string;
  password: string;
  role: "artist" | "manager";
  managerId?: mongoose.Types.ObjectId;
}

const userSchema = new mongoose.Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6, select: false },
  role: { type: String, required: true, enum: ["artist", "manager"] },
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const User = mongoose.model<User>("User", userSchema);
