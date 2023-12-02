import express from "express"

import { getKomentar, getKomenByForum, createKomentar, deleteKomentar, getKomenByAtlet, getKomenByuuid } from "../controllers/Komentar.js"
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/komentar", getKomentar);
router.get("/komentar/forum/:id", getKomenByForum);
router.get("/komentar/uuid/:id", getKomenByuuid);
router.get("/komentar/atlet/:id", getKomenByAtlet);
router.post("/komentar",verifyUser, createKomentar);
router.delete("/komentar/:id", deleteKomentar);

export default router