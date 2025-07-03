import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
const whiteList = [
  "http://localhost:5173",
  "http://localhost:5174"
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

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/category', categoryRouter);
app.use('/api/returns', returnRouter);

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