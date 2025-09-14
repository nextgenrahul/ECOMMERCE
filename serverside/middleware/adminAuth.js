import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if(!authHeader){
      return res.json({success: false, message: "No token Providedss"});
    }
    const token = authHeader.split(" ")[1]
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
