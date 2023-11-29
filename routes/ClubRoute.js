import express from "express"
import { createClub, deleteClub, getClubbyCabor } from "../controllers/Club.js"

const router = express.Router()
router.get("/club/:id", getClubbyCabor)
router.post("/club", createClub)
router.delete("/club/:id", deleteClub)
export default router;