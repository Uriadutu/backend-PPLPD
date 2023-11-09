import { AddCabor, GetCabor, DeleteCabor, GetcaborbyId } from "../controllers/Cabor.js";
import express from "express";

const router = express.Router();

router.get("/cabor/:id", GetcaborbyId);
router.get("/cabor", GetCabor);
router.post("/cabor", AddCabor);
router.delete("/cabor/:id", DeleteCabor);

export default router;