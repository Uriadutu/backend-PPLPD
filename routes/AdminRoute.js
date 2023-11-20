import express from "express";
import { getAdmin, getAdminById, createAdmin, updateAdmin, deleteAdmin } from "../controllers/Admin.js";
import { verifyUser, Adminonly, SuperAdminOnly } from "../middleware/AuthUser.js";
const router = express.Router();


router.get('/admin', getAdmin);
router.get('/admin/:id',verifyUser, Adminonly, getAdminById);
router.post('/admin',SuperAdminOnly, verifyUser, createAdmin);
router.patch("/admin/:id", Adminonly, SuperAdminOnly, verifyUser, updateAdmin);
router.delete("/admin/:id", Adminonly, SuperAdminOnly, verifyUser, deleteAdmin);

export default router;