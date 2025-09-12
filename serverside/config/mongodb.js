import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()
const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("DB Connected Successfully.💸 ");
        });
        console.log(process.env.MONGODB_URL)
        if(process.env.MONGODB_URL){    
            await mongoose.connect(`${process.env.MONGODB_URL}/buyit`);
        }else{
            console.log("MongoDB url doesn't found.")
        }

        mongoose.connection.on("error", (err) => {
            console.error("DB Connection Error:", err);
        });
    } catch (error) {
        console.error("Error while connecting to DB:", error.message);
        process.exit(1);
    }
};

export default connectDB;
