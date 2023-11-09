import express from "express";
import {
  getAtlet,
  getAtletbyCabor,
  getAtletById,
  createAtlet,
  updateAtlet,
  deleteAtlet,
  countAtletByCabor,
} from "../controllers/Atlet.js";

const router = express.Router();

router.get("/cabor/atlet/:id", getAtletbyCabor);
router.get("/atlet/countByCabor", countAtletByCabor);
router.get("/atlet", getAtlet);
router.get("/atlet/:id", getAtletById);
router.post("/atlet", createAtlet);
router.get("/atlet/:id", updateAtlet);
router.delete("/atlet/:id", deleteAtlet);

export default router;
