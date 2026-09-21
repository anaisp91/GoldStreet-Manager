import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI no esta definida en el .env");
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a la base de datos"))
  .catch((error) => console.log("Error al conectar la base de datos", error));
