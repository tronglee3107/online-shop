import express from "express";
import { addAddress, getAddress } from "../controllers/addressController.js";
import { getAllOrders, getUserOrders, placeOrderCOD } from "../controllers/orderController.js";
import { authAdmin } from "../middlewares/authAdmin.js";
import { authUser } from "../middlewares/authUser.js";

const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCOD);
orderRouter.get('/user', authUser, getUserOrders);
orderRouter.get('/admin', authAdmin, getAllOrders);

export default orderRouter;