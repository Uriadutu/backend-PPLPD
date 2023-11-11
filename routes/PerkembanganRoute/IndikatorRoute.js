import express from "express";
import { getIndikator } from "../../controllers/perkembangan/Indikator.js";

const router = express.Router();

router.get("/indikator", getIndikator);

export default router;
