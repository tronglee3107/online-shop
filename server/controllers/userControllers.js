import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
//TODO: register user --> /api/user/register
export const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        if (!name || !email || !password) {
            return res.json({success: false, message: "Missing user information!!"})
        }

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.json({success: false, message: "User existed"})
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashedPassword});

        //generate a token for login user
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
        res.cookie('token', token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // CSRF protection
            maxAge: 7 * 24 * 60 * 60* 1000
        })

        return res.json({success: true, user: {name: user.name, email: user.email}})
    } catch (error) {
        console.error("error while registering user, Error:: ", error);
        res.json({success: false, message: error.message});screenX
    }
}