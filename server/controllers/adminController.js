import jwt from "jsonwebtoken";

//admin login --> /api/admin/login

export const adminLogin = (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({
                success: false,
                message: "Email and password are required",
            });
        }

        if (
            email === process.env.ADMIN_EMAIL &&
            password === process.env.ADMIN_PASSWORD
        ) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, {
                expiresIn: "7d",
            });
            res.cookie("adminToken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite:
                    process.env.NODE_ENV === "production" ? "none" : "strict", // CSRF protection
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            return res.json({ success: true, message: "Admin logged in" });
        } else {
            return res.json({
                success: false,
                message: "Email or password is not correct",
            });
        }
    } catch (error) {
        console.error("Error while login admin user:: ", error);
        res.json({success: false, message: error.message});
    }
};

//logout admin --> /api/admin/logout
export const adminLogout = (req, res) => {
    try {
        res.clearCookie('adminToken', {
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

//check authorization --> /api/admin/is-auth
export const isAdminAuthorize = async (req, res) => {
    try {
        return res.json({success: true})
    } catch (error) {
        console.error(error);
        res.json({success:false, message:error.message});
    }
}
