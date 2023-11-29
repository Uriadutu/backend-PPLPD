import express from "express"
import { getClubAtlet, createClubAtlet, deleteClubAtlet } from "../controllers/ClubAtlet.js"

const router = express.Router()
router.get("/clubatlet", getClubAtlet)
router.post("/clubatlet", createClubAtlet)

export default  router;