import express from "express";
import { getPerkembangan } from "../../controllers/perkembangan/Perkem.js";

const router = express.Router();

router.get("/perkembangan", getPerkembangan);

export default router;

