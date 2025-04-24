import express from 'express'
import { isAuthorize, login, logout, register } from '../controllers/userControllers.js';
import {authUser} from "../middlewares/authUser.js";
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", authUser, logout);
userRouter.get("/is-auth", authUser, isAuthorize)
export default userRouter;