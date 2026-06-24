import express from "express";
import { fileURLToPath } from "url";
import { verifyAdmin } from "../Middlewares/tokenVerify.js";
import path from "path";

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

router.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "about.html"));
});

router.get("/admin", verifyAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "admin.html"));
});

router.get("/auth", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "auth.html"));
});

export default router;
