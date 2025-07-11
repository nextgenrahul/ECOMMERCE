import ReviewModel from "../models/reviewModel.js"
import userModel from "../models/userModel.js";

const addReview = async (req, res) => {
    try {
        const userId = req.userId; // Authenticated user ID
        const { comment, rating, productId } = req.body;

        if (!comment || !rating || !productId) {
            return res.json({ success: false, message: "All fields are required" });
        }

        const userExist = await userModel.findById(userId);
        if (!userExist) {
            return res.json({ success: false, message: "User not found" });
        }

        const existingReview = await ReviewModel.findOne({ userId, productId });
        if (existingReview) {
            return res.json({
                success: false,
                message: "You have already reviewed this product.",
            });
        }

        const reviewObj = {
            userId,
            productId,
            comment,
            rating,
        };

        const savedReview = await ReviewModel.create(reviewObj);

        return res.json({
            success: true,
            message: "Review submitted successfully!",
            review: savedReview,
        });
    } catch (error) {
        console.error("Add Review Error:", error);
        return res.json({
            success: false,
            message: "Something went wrong. Please try again later.",
        });
    }
};


const reviewList = async (req, res) => {
    try {
        const { productId } = req.query;

        if (!productId) {
            return res.json({
                success: false,
                message: "Product ID is required",
            });
        }

        const reviews = await ReviewModel.find({ productId })
            .populate("userId", "name email")
            .sort({ createdAt: -1 }); 

        return res.json({
            success: true,
            message: "Reviews fetched successfully",
            reviews,
        });
    } catch (error) {
        console.error("Review List Error:", error);
        return res.json({
            success: false,
            message: "Something went wrong while fetching reviews",
        });
    }
};


export {
    addReview,
    reviewList
}