import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
});

const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
    },
});

export default transporter;
