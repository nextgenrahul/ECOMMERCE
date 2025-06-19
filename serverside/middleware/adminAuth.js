import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req?.headers;
        if (!token) {
            return res.json({ success: false, Message: "Not Authorized login Again" })
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, Message: "Not Authorized login Again" })
        }
        next();
    } catch (error) {

    }

}

export default adminAuth;