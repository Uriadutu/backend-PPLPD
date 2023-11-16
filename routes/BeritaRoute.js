import express  from "express";
import { createBerita, deleteBerita, getBerita, getBeritaById } from "../controllers/Berita.js";

const router = express.Router();

router.get("/berita", getBerita);
router.get("/berita/:id", getBeritaById);
router.post("/berita", createBerita);
router.delete("/berita/:id", deleteBerita);


export default router;