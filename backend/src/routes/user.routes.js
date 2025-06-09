import { Router } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";
import { loginUser, registerUser, logoutUser, sentVerifyOtp, verifyEmail, sendResetOtp, resetPassword } from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get((req, res) => {
    const response = new ApiResponse(200, null, "API is working 🚀");
    res.status(response.statusCode).json(response);
});

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/send-verify-otp").post(verifyJWT, sentVerifyOtp);
router.route("/verify-account").post(verifyJWT, verifyEmail);
router.route("/send-reset-otp").post(sendResetOtp);
router.route("/reset-password").post(resetPassword);

export default router;
