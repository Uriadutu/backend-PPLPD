import express from "express";
import { getPanduan, DeletePanduan, CreatePanduan } from "../controllers/Panduan.js";
import { Adminonly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/panduan",Adminonly, getPanduan);
router.post("/panduan",Adminonly, CreatePanduan);
router.delete("/panduan/:id",Adminonly, DeletePanduan);

export default router;