import express from "express";
import {
  createPerkembangan,
  getPerkembangan,
  getPerkembanganbyTglAtlet,
  getPerkembanganByAtlet,
} from "../../controllers/perkembangan/Perkem.js";

const router = express.Router();

router.get("/perkembangan", getPerkembangan);
router.get("/perkembangan/atlet/:id", getPerkembanganByAtlet);
router.get("/perkembangan/:tgl/:idAtlet", getPerkembanganbyTglAtlet);
router.post("/perkembangan", createPerkembangan);

export default router;

