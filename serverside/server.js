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
app.use(cors());

// API Endpoints
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";

app.use('/api/user', userRouter)
app.use('/api/product', productRouter);


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