import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config(
    { path: "./.env" }
);
const app = express();
// Cors
console.log(process.env.CORS_ORIGIN)
app.use(cors(
    {
        origin: process.env.CORS_ORIGIN, 
        credentials: true
    }
));

app.use(express.json());
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser())
app.use(express.static('public'))


// Route
import router from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
app.use('/api/auth', router);
app.use('/api/user', userRouter);   


export {app}