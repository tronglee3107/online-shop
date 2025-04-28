

//udpate cart data: /api/cart/update

import User from "../models/User.js";

export const updateCart = async (req, res) => {
    try {
        const {userId, cartItems} = req.body;

        await User.findByIdAndUpdate(userId, {cartItems});
        res,json({success: true, message:"Cart updated"});
    } catch (error) {
        console.error("Error while updating carts");
        res.json({success: false, message: error.messgae});
    }
}