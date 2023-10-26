import express from "express";
import { getAdmin, getAdminById, createAdmin, updateAdmin, deleteAdmin } from "../controllers/Admin.js";

const router = express.Router();

router.get('/admin', getAdmin);
router.get('/admin/:id', getAdminById);
router.post('/admin', createAdmin);
router.patch('/admin/:id', updateAdmin);
router.delete('/admin/:id', deleteAdmin);

export default router;