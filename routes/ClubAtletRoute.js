import express from "express"
import { getClubAtlet, createClubAtlet, deleteClubAtlet } from "../controllers/ClubAtlet.js"

const router = express.Router()
router.get("/clubatlet", getClubAtlet)
router.post("/clubatlet", createClubAtlet)
router.delete("/clubatlet/:id", deleteClubAtlet)

export default  router;