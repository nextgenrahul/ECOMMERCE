import express from "express";
import { getUserData } from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.get('/data', verifyJWT, getUserData);

export default userRouter;
