import express from "express"
import { getForum, createForum, deleteForum, getForumbyId } from "../controllers/Forum.js"

const router = express.Router();

router.get("/forum", getForum)
router.get("/forum/:id", getForumbyId)
router.post("/forum", createForum)
router.delete("/forum/:id", deleteForum)

export default router;