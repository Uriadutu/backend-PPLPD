import { Addgambar, deletefile, getGambar, getGambarbyAtlet } from "../controllers/Gambar.js";
import express from "express";

const router = express.Router();

router.post("/gambar", Addgambar);
router.get("/gambar", getGambar);
router.get("/gambar/atlet/:id", getGambarbyAtlet);
router.delete("/gambar/:id", deletefile);

export default router;