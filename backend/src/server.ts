import express from "express";
import "./config/db.js";
import { userRouter } from "./routes/userRoutes.js";
import { authRouter } from "./routes/authRoutes.js";

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(authRouter);

app.get("/", (req, res) => {
  res.send("Gold Street Manager sfuncionando");
});

app.listen(3000, () => {
  console.log("Servidor funcionando en el puerto 3000");
});
