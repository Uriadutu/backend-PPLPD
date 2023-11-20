import express from "express";
import { createPerkembangan, getPerkembangan } from "../../controllers/perkembangan/Perkem.js";

const router = express.Router();

router.get("/perkembangan", getPerkembangan);
router.post("/perkembangan", createPerkembangan);


export default router;

