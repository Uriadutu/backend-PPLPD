import express from "express";
import {
  getAtlet,
  getAtletbyCabor,
  getAtletById,
  createAtlet,
  updateAtlet,
  deleteAtlet,
  countAtletByCabor,
  deleteAtletfile,
  getAtletByuuid,
} from "../controllers/Atlet.js";
import { Adminonly, verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/cabor/atlet/:id", getAtletbyCabor);
router.get("/atlet/countByCabor", countAtletByCabor);
router.get("/atlet", getAtlet);
router.get("/atlet/uuid/:id", getAtletByuuid);
router.get("/atlet/:id", getAtletById);
router.post("/atlet", createAtlet);
router.get("/atlet/:id", updateAtlet);
router.delete("/atlet/:id",verifyUser, Adminonly, deleteAtletfile);

export default router;
