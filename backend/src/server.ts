import express from "express";
import cors from "cors";
import "./config/db.js";
import "./config/cloudinary.js";
import { userRouter } from "./routes/userRoutes.js";
import { authRouter } from "./routes/authRoutes.js";
import { mediaSetRouter } from "./routes/mediaSetRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use(userRouter);
app.use(authRouter);
app.use(mediaSetRouter);

app.get("/", (req, res) => {
  res.send("Gold Street Manager sfuncionando");
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Servidor funcionando en ${PORT}`);
});
