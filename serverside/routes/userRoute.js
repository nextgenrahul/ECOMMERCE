import express from "express";
import { loginUser, sendResetOtp,check_auth, resetPassword, registerUser, adminLogin, googleLogin, logOut } from "../controllers/userController.js";
import authUser from "../middleware/auth.js";
// import adminAuth from "../middleware/adminAuth.js";
const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.get('/auth-check', check_auth);
userRouter.get('/logout',authUser, logOut);

// userRouter.post("/verify-login-otp", verifyOtpLogin)
userRouter.post("/send-reset-otp", sendResetOtp)
userRouter.post("/reset-password", resetPassword);
userRouter.post('/google-login', googleLogin)

export default userRouter