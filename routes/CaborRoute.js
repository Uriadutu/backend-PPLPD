import { AddCabor, GetCabor, DeleteCabor, GetcaborbyId } from "../controllers/Cabor.js";
import express from "express";
import { Adminonly, verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/cabor/:id", GetcaborbyId);
router.get("/cabor", GetCabor);
router.post("/cabor",verifyUser, Adminonly, AddCabor);
router.delete("/cabor/:id",verifyUser, Adminonly, DeleteCabor);

export default router;