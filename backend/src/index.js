import dotenv from "dotenv";
import connectDB from "./db/db.js";
import { app } from "./app.js";
dotenv.config(
    { path: "./.env" }
);
connectDB()
    .then(() => {
        const PORT = process.env.PORT;
        app.listen(PORT, () => {
            console.log(`🚀 Server is running at PORT: http://localhost:${PORT}`);
        })
    })
    .catch((err) => {
        console.error("❌ Server Connection Failed:", err);
    })
