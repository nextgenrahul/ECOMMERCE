import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken;

    if (!token) {
        return res.status(401).json(new ApiError(401, "Please login to access this resource."));
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decoded?._id) {
        return res.status(401).json(new ApiError(401, "Invalid token"));
    }
    if (!req.body) req.body = {};

    req.body.userId = decoded._id;
    next();
});

export default verifyJWT;
