import { createAtletCabangOlahraga } from "../controllers/AtletCabor.js";
import express from "express";

const router = express.Router();

router.post("/atletcabor", createAtletCabangOlahraga);

export default router;