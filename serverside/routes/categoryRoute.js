import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import { addCategory, getCategoryList, deleteCategory, addSubcategory } from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post('/add', adminAuth, addCategory);
categoryRouter.post('/addSubcategory', adminAuth, addSubcategory);
categoryRouter.get('/list', getCategoryList);
categoryRouter.delete('/delete/:id', adminAuth, deleteCategory);

export default categoryRouter;

