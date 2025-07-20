import express from "express";
import { addColor, deleteColor,getColorList, updateColor } from "../controllers/colorController.js";
import adminAuth from "../middleware/adminAuth.js";
const colorRoute = express.Router();

colorRoute.post("/addColor", adminAuth, addColor);
colorRoute.post("/updateColor", adminAuth, updateColor);
colorRoute.post("/deleteColor", adminAuth, deleteColor);
colorRoute.get("/list", adminAuth, getColorList)

export default colorRoute;