import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized. Login Again",
    });
  }
  try {
    const token_decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = token_decode.id;

    next();

  } catch (error) {
    console.error("JWT Error:", error);
    res.json({
      success: false,
      message: "Token is invalid or expired",
    });
  }
};

export default authUser;
