import express from "express"
import {
  getLatihan,
  getLatihanbyIndi,
  getLatihanbyId,
  createLatihan,
  deleteLatihan,
} from "../../controllers/perkembangan/Latihan.js";

const router = express.Router();

router.get("/latihan", getLatihan);
router.get("/latihan/:id", getLatihanbyId);
router.get("/latihan/indikator/:id", getLatihanbyIndi);
router.post("/latihan", createLatihan);
router.delete("/latihan/:id", deleteLatihan);

export default router;