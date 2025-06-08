import { Router } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";

const router = Router();

router.route("/").get((req, res) => {
    const response = new ApiResponse(200, null, "API is working 🚀");
    res.status(response.statusCode).json(response);
});

export default router;
