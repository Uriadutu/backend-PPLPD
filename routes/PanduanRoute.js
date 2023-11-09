import express from "express";
import { getPanduan, DeletePanduan, CreatePanduan } from "../controllers/Panduan.js";

const router = express.Router();

router.get("/panduan", getPanduan);
router.post("/panduan", CreatePanduan);
router.delete("/panduan/:id", DeletePanduan);

export default router;