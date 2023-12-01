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
router.get("/pelatih/cabor/:id",verifyUser, Adminonly,getPelatihByCabor);
router.post("/pelatih",verifyUser,createPelatih);
router.get("/pelatih/:id",verifyUser, Adminonly, updatePelatih);
router.delete("/pelatih/:id",verifyUser, Adminonly, deletePelatih);

export default router;
