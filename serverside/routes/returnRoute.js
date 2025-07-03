import express from "express"
import { createReturn, getAllReturns, updateReturnStatus } from "../controllers/reuturnController.js";
const returnRouter = express.Router();

returnRouter.post('/', createReturn);
// returnRouter.get('/user',  getUserReturns);
// returnRouter.get('/all', getAllReturns); 
returnRouter.put('/:orderId', updateReturnStatus);

export default returnRouter;