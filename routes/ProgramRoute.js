import express from "express"
import { getProgram, getProgrambyCabor, getProgrambyId, createProgram, deleteProgram } from "../controllers/Program.js"

const router= express.Router();

router.get("/program", getProgram);
router.get("/program/:id", getProgrambyId);
router.get("/program/cabor/:id", getProgrambyCabor);
router.post("/program", createProgram);
router.delete("/program/:id", deleteProgram);

export default  router;