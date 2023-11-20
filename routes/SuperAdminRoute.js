import express from "express";
import { getSuperAdmin, createSuper, getSuperbyId } from "../controllers/SuperAdmin.js";

const router = express.Router();

router.get("/super", getSuperAdmin)
router.get("/super/:id", getSuperbyId)
router.post("/super", createSuper)

export default router;