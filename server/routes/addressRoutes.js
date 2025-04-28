import express from "express";
import { addAddress, getAddress } from "../controllers/addressController.js";
import { authUser } from "../middlewares/authUser.js";

const addressRouter = express.Router();

addressRouter.get("/get", authUser, getAddress);
addressRouter.post("/add", authUser, addAddress);

export default addressRouter;