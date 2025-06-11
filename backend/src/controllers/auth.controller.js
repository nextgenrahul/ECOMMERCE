import transporter from "../../config/nodemailer.js";
import User from "../models/user.models.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken };
    } catch {
        throw new ApiError(500, "Something Went Wrong While Generating Token");
    }
}


const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;

    if ([fullName, email, password].some((field) => !field?.trim())) {
        throw new ApiError(400, "All fields are required.");
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
        throw new ApiError(409, "User already exists with this email.");
    }
    const user = await User.create({
        fullName,
        email,
        password
    });

    const safeUser = await User.findById(user._id).select(
        "-password -refreshToken -verifyOtp -verifyOtpExpireAt -resetOtp -resetOtpExpireAt"
    );

    if (!safeUser) {
        throw new ApiError(500, "Something went wrong while fetching user data.");
    }
    const mailOptions = {
        from: "techfuture98127@gmail.com",
        to: email,
        subject: "Welcome to Our Company",
        text: `Welcome to our company! You are now registered as a client.Your \nemail ID: ${email}`,
    }
    await transporter.sendMail(mailOptions);
    return res
        .status(201)
        .json(new ApiResponse(201, safeUser, "User registered successfully."));
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required.");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User does not exist. Please sign up first.");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Password is incorrect.");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken -verifyOtp -verifyOtpExpireAt -resetOtp -resetOtpExpireAt"
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User Logged In Successfully"
            )
        );
});

const logoutUser = asyncHandler(async (req, res) => {
    console.log(req.body._id)
    await User.findByIdAndUpdate(
        req.body._id,
        {
            $unset:
            {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }
    res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully."));
});

const sentVerifyOtp = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    console.log(userId);

    if (!userId) {
        return res.status(400).json(new ApiError(400, "User ID is required."));
    }

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json(new ApiError(404, "User not found."));
    }

    if (user.isAccountVerified) {
        return res.status(400).json(new ApiError(400, "Account is already verified."));
    }

    // Generate six-digit OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    await user.save();

    const mailOptions = {
        from: "techfuture98127@gmail.com",
        to: user.email,
        subject: "Account Verification OTP",
        text: `Hi ${user.name},\n\nYour OTP for account verification is: ${otp}.\nIt is valid for 24 hours.\n\nThank you!`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json(new ApiResponse(200, {}, "OTP sent to your email."));
});


const verifyEmail = asyncHandler(async (req, res) => {
    const { userId, otp } = req.body;

    const user = await User.findById(userId);
    if (!user) {
        return res.json(new ApiError(401, "User Not Found"));
    }

    if (user.isAccountVerified) {
        return res.json(new ApiError(401, "Account already verified"));
    }

    if (user.verifyOtp !== otp) {
        return res.json(new ApiError(401, "Invalid OTP"));
    }

    if (user.verifyOtpExpireAt < Date.now()) {
        return res.json(new ApiError(401, "OTP expired"));
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    
    await user.save();

    return res.json(new ApiResponse(200, {}, "Account verified successfully"));
});

const sendResetOtp = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.json(new ApiError(401, "Email is required."))
    }
    const user = await User.findOne({ email })
    if (!user) {
        return res.json(
            new ApiError(400, "User Not Found")
        )
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
    await user.save();

    const mailOptions = {
        from: "techfuture98127@gmail.com",
        to: user.email,
        subject: "Password Reset OTP",
        text: `Hi ${user.name},\n\nYour OTP for password reset is: ${otp}.\nIt is valid for 15 minutes.\n\nThank you!`,
    };
    await transporter.sendMail(mailOptions);
    return res.json(
        new ApiResponse(200, {}, "Reset OTP sent to your email.")
    )
});


const resetPassword = asyncHandler(async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if ([otp, email, newPassword].some((field) => !field?.trim())) {
        throw new ApiError(400, "All fields are required.");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(401, "User Not Found");
    }

    if (user.resetOtp === "" || user.resetOtp !== otp) {
        throw new ApiError(401, "Invalid OTP");
    }

    if (user.resetOtpExpireAt < Date.now()) {
        return res.status(400).json({ success: false, message: "OTP expired" });
    }

    user.password = newPassword;
    user.resetOtp = '';
    user.resetOtpExpireAt = 0;
    await user.save();

    return res.status(200).json(
        new ApiResponse(200, {}, "Password reset successfully")
    );
});

const isAuthenticated = asyncHandler(async (req, res) => {
    try {
        return res.json(new ApiResponse(200))
    } catch (error) {
        res.json(new ApiError(400, error.message))
    }
}
)


export {
    registerUser,
    loginUser,
    logoutUser,
    sentVerifyOtp,
    verifyEmail,
    sendResetOtp,
    resetPassword,
    isAuthenticated
}