import { Addgambar, deletefile } from "../controllers/Gambar.js";
import express from "express";

const router = express.Router();

router.post("/gambar", Addgambar);
router.delete("/gambar/:id", deletefile);

export default router;