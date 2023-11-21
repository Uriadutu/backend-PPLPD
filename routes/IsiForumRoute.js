import express from "express"
import { getChatbyForum, createChat,deleteChat } from "../controllers/IsiForum.js"
import { verifyUser } from "../middleware/AuthUser.js";
const router = express.Router();


router.get("/chat/:id",verifyUser, getChatbyForum)
router.post("/chat",verifyUser, createChat)
router.delete("/chat/:id", deleteChat)

export default router;