import express  from "express";
import { getBerita } from "../controllers/Berita.js";

const router = express.Router();

router.get("/berita", getBerita);

export default router;