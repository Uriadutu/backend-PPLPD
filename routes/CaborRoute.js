import { AddCabor, GetCabor, DeleteCabor } from "../controllers/Cabor.js";
import express from "express";

const router = express.Router();

router.get("/cabor", GetCabor);
router.post("/cabor", AddCabor);
router.delete("/cabor/:id", DeleteCabor);

export default router;