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

        return res.json({success: true, user: {name: user.name, email: user.email}, message: "Registered Successfully"})
    } catch (error) {
        console.error("error while registering user, Error:: ", error);
        res.json({success: false, message: error.message});
    }
}

// User login ==> /api/v1/login
export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            res.json({success: false, message: "Email and password are required"});
        }

        const user = await User.findOne({email});

        if (!user) {
            return res.json({success: false, message: "Email is not existed"});
        }
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.json({success: false, message: "Password is not correct"}); 
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
        res.cookie('token', token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // CSRF protection
            maxAge: 7 * 24 * 60 * 60* 1000
        })
        return res.json({success: true, user: {email: user.email, name:user.name},  message: "Login successfully"})
    } catch (error) {
        console.error("error while login user, Error:: ", error);
        res.json({success: false, message: error.message});
    }
}

//logout --> /api/user/logout

export const logout = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict'
        })
        return res.json({success: true, message: "Logged out"});
    } catch (error) {
        console.error("Error while loging out user, Error:: ", error);
        res.json({success:false, message: error.message});
    }
}

//check authorization --> /api/user/is-auth
export const isAuthorize = async (req, res) => {
    try {
        const {userId} = req.body;
        const user = await User.findById(userId).select("-password");
        return res.json({success: true, user})
    } catch (error) {
        console.error(error);
        res.json({success:false, message:error.message});
    }
}

