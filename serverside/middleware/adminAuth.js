import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const {token} = req.headers

    if (!token) {
      return res.json({ success: false,  message: "Not Authorized. Login Again" });
    }
    const token_decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (token_decode.email !== process.env.ADMIN_EMAIL) {
      return res.json({ success: false, message: "Not Authorized. Login Again" });
    }
    next();
  } catch (error) {
    console.log("JWT Error:", error);
    res.json({ success: false, message: "Not Authorized" });
  }
};

export default adminAuth;
