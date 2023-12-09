import express from "express";
import {
  getAtlet,
  getAtletbyCabor,
  getAtletById,
  createAtlet,
  updateAtlet,
  countAtletByCabor,
  deleteAtletfile,
  getAtletByuuid,
  getAtletbyclubnol,
  getAtletbyclubisi,
} from "../controllers/Atlet.js";
import { Adminonly, verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/cabor/atlet/:id", getAtletbyCabor);
router.get("/atlet/countByCabor", countAtletByCabor);
router.get("/atlet/club/nol/:club", getAtletbyclubnol);
router.get("/atlet/club/isi/:club", getAtletbyclubisi);
router.get("/atlet", getAtlet);
router.get("/atlet/uuid/:id", getAtletByuuid);
router.get("/atlet/:id", getAtletById);
router.patch("/atlet/:id", updateAtlet);
router.post("/atlet",verifyUser, createAtlet);
router.delete("/atlet/:id",verifyUser, Adminonly, deleteAtletfile);

export default router;
