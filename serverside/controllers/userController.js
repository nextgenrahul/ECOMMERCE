import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library"
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";

// Token
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Auth Setup And User Data Also 
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = userModel.findById(userId);
    if (user) {
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });
      return { accessToken, refreshToken };
    } else {
      res.json({ success: false, message: "Invalid credentials." });

    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
};

// Route for user register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if ([name, email, password].some((field) => !field?.trim())) {
      return res.json({ success: false, message: "All Fields are required" });
    }
    // Check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists." });
    }
    // Validate email and password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email." });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password." });
    }

    // Hash password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save new user
    const user = await userModel.create({
      name,
      email,
      password,
    });

    // Generate JWT
    // const token = createToken(user._id);
    const safeUser = await userModel.findById(user._id).select(
      "-password -refreshToken -verifyOtp -verifyOtpExpireAt -resetOtp -resetOtpExpireAt"
    );
    if (!safeUser) {
      return res.json({ success: false, message: "Something went wrong while fetching user data." })
    }
    const mailOptions = {
      from: "techfuture98127@gmail.com",
      to: email,
      subject: "Welcome to Our Company",
      text: `Welcome to our company! You are now registered as a client.Your \nemail ID: ${email}`,
    }

    await transporter.sendMail(mailOptions);
    res.json({ success: true, safeUser, message: "User registered successfully." });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// User login 
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if ([email, password].some((field) => !field?.trim())) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist." });
    }

    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {
      return res.json({ success: false, message: "Password is incorrect" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 5 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    const mailOptions = {
      from: "techfuture98127@gmail.com",
      to: email,
      subject: "Your Login OTP",
      text: `Your OTP is ${otp}`
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "OTP sent to your email",
      userId: user._id
    });

  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// Logout
const logOut = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.json({ success: false, message: "No token provided" });
    }
    const user = await userModel.findOne({ refreshToken });
    if (!user) {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      return res.json({ success: true, message: "Logged out Without token." });
    }
    user.refreshToken = null;
    user.isAccountVerified = false;
    await user.save({ validateBeforeSave: false });
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Logout failed" })
  }
};

// Send verify Otp
const verifyOtpLogin = async (req, res) => {
  try {
    const { otp, userId } = req.body;

    if (!otp) {
      return res.json({ success: false, message: "Please enter the OTP first." });
    }
    if (!userId) {
      return res.json({ success: false, message: "Please login first." });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found in DB." });
    }

    const isOtpValid =
      Number(user.verifyOtp) === Number(otp) &&
      user.verifyOtpExpireAt > Date.now();

    if (!isOtpValid) {
      return res.json({ success: false, message: "Invalid or expired OTP." });
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = undefined;
    user.isAccountVerified = true;

    await user.save({ validateBeforeSave: false });

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production"
    };

    const loggedInUser = await userModel.findById(user._id).select(
      "-password -refreshToken -verifyOtp -verifyOtpExpireAt -resetOtp -resetOtpExpireAt"
    );

    return res
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        message: "User authenticated successfully.",
        user: loggedInUser,
        accessToken,
        refreshToken
      });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Send Otp for reset password
const sendResetOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return res.json({ success: false, message: "Valid email is required." });
    }

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User with this email does not exist." });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Set OTP and expiry
    user.resetOtp = otp;
    user.resetOtpExpireAt = new Date(Date.now() + 5 * 60 * 1000);
    await user.save({ validateBeforeSave: false });

    // Send OTP via email

    const mailOptions = {
      from: "techfuture98127@gmail.com",
      to: email,
      subject: "Your OTP for Password Reset",
      text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    // Success response
    return res.json({
      success: true,
      message: "OTP sent to your email successfully.",
      userId: user._id
    });
  } catch (error) {
    console.error("OTP sending failed:", error);
    return res.json({
      success: false,
      message: "Something went wrong while sending OTP. Please try again.",
    });
  }
};

// Verify otp for reset password
const resetPassword = async (req, res) => {
  try {
    const { otp, email, newPassword } = req.body;
    if (otp.length !== 6 || !otp) {
      res.json({ success: false, message: "Please Enter correct otp." });
    }
    if (!email || !newPassword) {
      res.json({ success: false, message: "Please Enter email and password." });
    }

    const user = await userModel.findOne({ email, resetOtp: otp });
    if (!user) {
      return res.json({ success: false, message: "OTP or email is incorrect" });
    }

    if (user.resetOtpExpireAt < new Date()) {
      return res.json({ success: false, message: "OTP has expired" });
    }
    user.password = newPassword
    user.resetOtp = undefined
    user.resetOtpExpireAt = undefined
    await user.save()
    res.json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.json({ success: false, message: "Server error" })
  }
}

// Route for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const ADMIN_HASHED_PASSWORD = process.env.ADMIN_PASSWORD_HASH;
    console.log(ADMIN_HASHED_PASSWORD)
    if (email.trim() !== ADMIN_EMAIL) {
      return res.json({ success: false, message: "Unauthorized: Invalid Email" });
    }

    const isMatch = await bcrypt.compare(password, ADMIN_HASHED_PASSWORD);
    if (!isMatch) {
      return res.json({ success: false, message: "Unauthorized: Invalid Password" });
    }
    const token = jwt.sign({ role: "admin", email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ success: true, token });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
};
// Google Login
const googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });


    const payload = ticket.getPayload();
    const { email, name } = payload;


    let user = await userModel.findOne({ email });

    if (!user) {
      user = await userModel.create({
        name,
        email,
        password: "",
        googleId: sub,
        provider: "google",
        isAccountVerified: true,
      });
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.json({
      success: true,
      message: "Logged in with Google",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        provider: user.provider,
      },
    })

  } catch (error) {
    console.error("Google login error:", error);
    return res.json({
      success: false,
      message: "Google login failed",
    });
  }
};

export { loginUser, logOut, registerUser, adminLogin, googleLogin, verifyOtpLogin, sendResetOtp, resetPassword };
