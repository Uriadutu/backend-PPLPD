import express from "express";
import {
  getPelatih,
  getPelatihById,
  createPelatih,
  updatePelatih,
  deletePelatih,
  getPelatihByCabor,
  getPelatihByuuid,
} from "../controllers/Pelatih.js";
import { Adminonly, verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/pelatih", getPelatih);
router.get("/pelatih/:id", getPelatihById);
router.get("/pelatih/uuid/:id", getPelatihByuuid);
router.get("/pelatih/cabor/:id",verifyUser,getPelatihByCabor);
router.post("/pelatih",verifyUser,createPelatih);
router.patch("/pelatih/:id",verifyUser, updatePelatih);
router.delete("/pelatih/:id",verifyUser, deletePelatih);

export default router;
