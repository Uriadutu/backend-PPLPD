import express from "express";
import { CreateIndikator, DeleteIndikator, getIndikator, getIndikatorByKomponen, getIndikatorbyId } from "../../controllers/perkembangan/Indikator.js";

const router = express.Router();

router.get("/indikator", getIndikator);
router.get("/indikator/:id", getIndikatorbyId);
router.get("/indikator/komponen/:id", getIndikatorByKomponen);
router.post("/indikator", CreateIndikator);
router.delete("/indikator/:id", DeleteIndikator);


export default router;
