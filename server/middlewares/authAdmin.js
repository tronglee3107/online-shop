import jwt from 'jsonwebtoken';


export const authAdmin = (req, res, next) => {
    const { adminToken } = req.cookies;

    if (!adminToken) {
        res.json({succes: false, message: "Unauthorized"})
    }
    try {
        const tokenDecode = jwt.verify(adminToken, process.env.JWT_SECRET);
        if (tokenDecode.email === process.env.ADMIN_EMAIL) {
            req.body = req.body || {};
            req.body.userId = tokenDecode.id;
        } else {
            return res.json({ success: false, message: "Unauthorized" });
        }
        next();
    } catch (error) {
        console.error("Error while authorizing user, Error:: ", error);
        res.json({ success: false, message: error.message });
    }
};
