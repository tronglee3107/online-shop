import express from 'express'
import { adminLogin, adminLogout, isAdminAuthorize } from '../controllers/adminController.js';
import {authAdmin} from '..//middlewares/authAdmin.js'
const amdinRouter = express.Router();

amdinRouter.post("/login", adminLogin);
amdinRouter.post("/logout", authAdmin, adminLogout);
amdinRouter.get("/is-auth", authAdmin, isAdminAuthorize)
export default amdinRouter;