import jwt from 'jsonwebtoken';
export const authUser = async (req, res, next) => {
    const {token} = req.cookies;
     
    if (!token) {
        return res.json({success: false, message: "Unauthorized"});
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if (tokenDecode) {
            req.body = req.body || {};
            req.body.userId = tokenDecode.id;
        } else {
            return res.json({success: false, message: "Unauthorized"});
        }
        next();
    } catch (error) {
        console.error("Error while authorizing user, Error:: ", error);
        res.json({success:false, message: error.message});
    }
}