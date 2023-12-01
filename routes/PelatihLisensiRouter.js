import express from "express";
import { getLisensiPelatih, getLisensiPelatihbyIDPelatih, createLisensiPelatih, deleteLisensiPelatih } from "../controllers/LisensiPelatih.js";

const router = express.Router();
router.get("/lisensi", getLisensiPelatih)
router.get("/lisensi/pelatih/:idPelatih", getLisensiPelatihbyIDPelatih)
router.post("/lisensi", createLisensiPelatih)
router.delete("/lisensi/:id", deleteLisensiPelatih)

export default  router