import express from "express";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
import productRouter from "./Routes/productRoute.js";
import fileRouter from "./Routes/filesRoute.js";
import userRouter from "./Routes/userRoute.js";
import "./db.js";

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.json());
app.use(express.static(path.join(__dirname)));
dotenv.config();

app.use("/api/products", productRouter);

app.use("/api/users", userRouter);

app.use("/", fileRouter);

app.listen(PORT, () =>
  console.log(`server is running on http://localhost:${PORT}`),
);
