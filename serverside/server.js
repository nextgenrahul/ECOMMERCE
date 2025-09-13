import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import cookieParser from "cookie-parser";

// App Config
const app = express();
app.use(cookieParser());
const port = process.env.PORT || 4000;
app.use(express.urlencoded({ extended: true }));

// Middlewares
app.use(express.json());
const whiteList = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "https://ecommerce-gqp2.onrender.com",
  "https://ecommerce-1-qxo4.onrender.com"

];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || whiteList.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by cors"));
      }
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "token"]
  })
);

// API Endpoints
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import categoryRouter from "./routes/categoryRoute.js";
import returnRouter from "./routes/returnRoute.js";
import colorRoute from "./routes/colorRoute.js";
import reviewRouter from "./routes/reviewRoute.js";

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/category', categoryRouter);
app.use('/api/returns', returnRouter);
app.use('/api/color', colorRoute);
app.use('/api/review', reviewRouter);

// Connect to DB and Start Server
Promise.all([
  connectDB(),
  connectCloudinary()
])
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server started on: http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Startup failed:", err.message);
    process.exit(1);
  });