import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import connectDB from "./config/dbConnect.js";
import authenticationRouter from "./routes/AuthenticationRoutes.js";
import userRouter from "./routes/UserRoutes.js";
import blogRouter from "./routes/BlogRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors({
    origin: "*"
}));

app.use("/authentication", authenticationRouter);
app.use("/user", userRouter);
app.use("/blogs", blogRouter);

app.use((error, req, res, next) => {
    const statusCode = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || "Server error. We are fixing it.";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

mongoose.connection.once("open", () => {
    console.log("Mongo DB Connected");
    app.listen(PORT, () => {
        console.log(`Server started at PORT: ${PORT}`);
    });
});