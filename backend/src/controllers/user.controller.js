import User from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getUserData = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.json(new ApiError(400, "User Id is not found"));
    }

    const user = await User.findById(userId);

    if (!user) {
        return res.json(new ApiError(200, "User not Found"));
    }

    res.json(
        new ApiResponse(200, {
            name: user.fullName,
            isAccountVerified: user.isAccountVerified,
        })
    );
});

export { getUserData };
