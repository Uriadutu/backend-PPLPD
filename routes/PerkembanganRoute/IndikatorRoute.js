import express from "express";
import { CreateIndikator, DeleteIndikator, getIndiByCabor, getIndikator, getIndikatorByKomponen, getIndikatorbyId } from "../../controllers/perkembangan/Indikator.js";

const router = express.Router();

router.get("/indikator", getIndikator);
router.get("/indikator/:id", getIndikatorbyId);
router.get("/indikator/komponen/:id", getIndikatorByKomponen);
router.get("/indikator/cabor/:id", getIndiByCabor);
router.post("/indikator", CreateIndikator);
router.delete("/indikator/:id", DeleteIndikator);


export default router;
