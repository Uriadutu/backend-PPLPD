import express from "express";
import {
  getPelatih,
  getPelatihById,
  createPelatih,
  updatePelatih,
  deletePelatih,
} from "../controllers/Pelatih.js";

const router = express.Router();

router.get("/pelatih", getPelatih);
router.get("/pelatih/id", getPelatihById);
router.post("/pelatih", createPelatih);
router.get("/pelatih/:id", updatePelatih);
router.delete("/pelatih/:id", deletePelatih);

export default router;
