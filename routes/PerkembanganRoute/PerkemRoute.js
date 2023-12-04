import express from "express";
import {
  createPerkembangan,
  getPerkembangan,
  getPerkembanganbyTglAtlet,
  getPerkembanganByAtlet,
  deletePerkembanganbytgl,
  getPerkembanganByid,
} from "../../controllers/perkembangan/Perkem.js";

const router = express.Router();

router.get("/perkembangan", getPerkembangan);
router.get("/perkembangan/:id", getPerkembanganByid);
router.get("/perkembangan/atlet/:id", getPerkembanganByAtlet);
router.get("/perkembangan/:tgl/:idAtlet", getPerkembanganbyTglAtlet);
router.post("/perkembangan", createPerkembangan);
router.delete("/perkembangan/:id", deletePerkembanganbytgl);

export default router;

