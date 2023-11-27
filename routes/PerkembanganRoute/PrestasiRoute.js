import express from "express"
import { getPrestasi, getPrestasiByAtlet,deeletePrestasi,createPrestasi } from "../../controllers/Prestasi.js"

const router = express.Router();

router.get("/prestasi", getPrestasi);
router.get("/prestasi/:id", getPrestasiByAtlet);
router.post("/prestasi", createPrestasi);
router.delete("/prestasi/:id", deeletePrestasi);

export default router;