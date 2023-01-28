import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import dotenv from "dotenv";
import { validationResult } from "express-validator";
import User from "../models/User.js";
import CustomError from "../errors/CustomError.js";
dotenv.config();

const registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new CustomError(StatusCodes.BAD_REQUEST, "Please provide all the required details in correct format."));
        }
        const { firstName, lastName, email, password, profilePic } = req.body;
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return next(new CustomError(StatusCodes.CONFLICT, "User already exist."));
        }
        const saltValue = await bcryptjs.genSalt(12);
        const hashedPassword = await bcryptjs.hash(password, saltValue);
        await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            profilePic
        });
        res.status(StatusCodes.CREATED).json({ message: "User registered successfully." });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const loginUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new CustomError(StatusCodes.BAD_REQUEST, "Email or Password is incorrect."));
        }
        const { email, passWord } = req.body;
        const userExist = await User.findOne({ email: email });
        if (!userExist) {
            return next(new CustomError(StatusCodes.NOT_FOUND, "User not found. Please register to continue."));
        }
        const passwordsMatched = await bcryptjs.compare(passWord, userExist.password);
        if (!passwordsMatched) {
            return next(new CustomError(StatusCodes.CONFLICT, "Email or Password is incorrect"));
        }
        const accessToken = jwt.sign({
            id: userExist._id
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20m" });
        const { password, ...others } = userExist._doc;
        res.status(StatusCodes.OK).json({ accessToken, user: others });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export {
    registerUser,
    loginUser
};