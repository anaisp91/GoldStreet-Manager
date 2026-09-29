import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

if (!process.env.CLOUDINARY_CLOUD_NAME) {
  throw new Error("CLOUDINARY CLOUD NAME no esta definida en el .env");
}
if (!process.env.CLOUDINARY_API_KEY) {
  throw new Error("CLOUDINARY API KEY no esta definida en el .env");
}
if (!process.env.CLOUDINARY_API_SECRET) {
  throw new Error("CLOUDINARY API SECRET no esta definida en el .env");
}
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
