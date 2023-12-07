import express from "express"
import { getPrestasiPelatih, getPrestasiPelatihbyId, CreatePrestasiPelatih, DeletePrestasiPelatih } from "../controllers/PrestasiPelatih.js"

const router = express.Router()
router.get("/prestasipelatih/", getPrestasiPelatih);
router.get("/prestasi/pelatih/:id", getPrestasiPelatihbyId);
router.post("/prestasi/pelatih/", CreatePrestasiPelatih);
router.delete("/prestasi/pelatih/:id", DeletePrestasiPelatih);
export default router;