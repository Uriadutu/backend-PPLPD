import express from "express";
import { getAdmin, getAdminById, createAdmin, updateAdmin, deleteAdmin } from "../controllers/Admin.js";
import { verifyUser, Adminonly } from "../middleware/AuthUser.js";
const router = express.Router();


router.get('/admin', getAdmin);
router.get('/admin/:id',verifyUser, Adminonly, getAdminById);
router.post('/admin',Adminonly,verifyUser, createAdmin);
router.patch('/admin/:id',Adminonly, verifyUser, updateAdmin);
router.delete('/admin/:id',Adminonly, verifyUser, deleteAdmin);

export default router;