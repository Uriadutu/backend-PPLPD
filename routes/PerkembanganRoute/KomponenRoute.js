import express from "express";
import { CreateKomponen, DeleteKomponen, DeleteOneKomponen, getKomponen, getKomponenByCabor, getKomponenById, getKomponenByPeriodeAndCabor } from "../../controllers/perkembangan/komponen.js";

const router = express.Router();

router.get("/komponen", getKomponen);
router.get("/komponen/:id", getKomponenById);
router.get("/komponen/cabor/:id", getKomponenByCabor);
router.get("/komponen/periode/:id/:periode", getKomponenByPeriodeAndCabor);
router.post("/komponen", CreateKomponen);
router.delete("/komponen/cabor/:id", DeleteKomponen);
router.get("/komponen/cabor/:id", getKomponenByCabor);
router.delete("/komponen/:id", DeleteOneKomponen);


export default router;
