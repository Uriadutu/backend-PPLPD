import { Login, Logout, Me } from "../controllers/Auth.js";
import express from "express";

const router = express.Router();

router.post("/login", Login);
router.delete("/logout", Logout);
router.get("/me", Me);

export default router;