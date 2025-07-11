import express from "express";
import authUser from "../middleware/auth.js";
import { addReview, reviewList } from "../controllers/reviewController.js";

const reviewRouter = express.Router();
reviewRouter.post("/addReview", authUser, addReview);
reviewRouter.get("/reviewListByProduct", reviewList);

export default reviewRouter;