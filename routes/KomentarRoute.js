import express from "express"

import { getKomentar, getKomenByForum, createKomentar, deleteKomentar } from "../controllers/Komentar.js"
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/komentar", getKomentar);
router.get("/komentar/forum/:id", getKomenByForum);
router.post("/komentar",verifyUser, createKomentar);
router.delete("/komentar/:id", deleteKomentar);

export default router