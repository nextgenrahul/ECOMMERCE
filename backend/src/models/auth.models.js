import { verify } from "crypto";
import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            index: true,
            lowercase: true
        },
        password: {
            type: String,
            required: [true, "Password is required."]
        },
        verifyOtp: {
            type: String,
            default: ""
        },
        verifyOtpExpireAt: {
            type: Number,
            default: 0
        },
        isAccountVerified: {
            type: Boolean,
            default: false
        },
        resetOtp: {
            type: String,
            default: ""
        },
        resetOtpExpireAt: {
            type: Number,
            default: 0
        },
        refreshToken: {
            type: String,
            default: ""
        }
    }, {
    timestamps: true
}
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;