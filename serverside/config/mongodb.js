import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("DB Connected Successfully.💸 ");
        });
        await mongoose.connect(`${process.env.MONGODB_URL}/e-commerce`);

        mongoose.connection.on("error", (err) => {
            console.error("DB Connection Error:", err);
        });
    } catch (error) {
        console.error("Error while connecting to DB:", error.message);
        process.exit(1);
    }
};

export default connectDB;
