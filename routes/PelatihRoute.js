import express from "express";
import {
  getPelatih,
  getPelatihById,
  createPelatih,
  updatePelatih,
  deletePelatih,
} from "../controllers/Pelatih.js";
import { Adminonly, verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/pelatih", getPelatih);
router.get("/pelatih/id", getPelatihById);
router.post("/pelatih",verifyUser, Adminonly,createPelatih);
router.get("/pelatih/:id",verifyUser, Adminonly, updatePelatih);
router.delete("/pelatih/:id",verifyUser, Adminonly, deletePelatih);

export default router;
