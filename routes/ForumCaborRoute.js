import express from "express"
import { getForumCabor, createForumCabor, deleteForumCabor, getForumCaborbyCabor, countForumByCabor } from "../controllers/ForumCabor.js"
import { verifyUser } from "../middleware/AuthUser.js"

const router = express.Router()
router.get("/forumcabor", getForumCabor)
router.get("/forumcabor/cabor/count/", countForumByCabor)
router.get("/forumcabor/cabor/:id", getForumCaborbyCabor)
router.post("/forumcabor", verifyUser, createForumCabor);
router.delete("/forumcabor/:id", deleteForumCabor)
export default router;