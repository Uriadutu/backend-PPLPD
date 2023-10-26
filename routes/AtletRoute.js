import express from "express";
import {
  getAtlet,
  getAtletById,
  createAtlet,
  updateAtlet,
  deleteAtlet,
} from "../controllers/Atlet.js";

const router = express.Router();

router.get("/atlet", getAtlet);
router.get("/atlet/id", getAtletById);
router.post("/atlet", createAtlet);
router.get("/atlet/:id", updateAtlet);
router.delete("/atlet/:id", deleteAtlet);

export default router;
