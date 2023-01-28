import { validationResult } from "express-validator";
import bcryptjs from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors/CustomError.js";
import User from "../models/User.js";

const putUpdateUserProfile = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new CustomError(StatusCodes.BAD_REQUEST, "Please provide all the required details in correct format."));
        }
        const userId = req.userId;
        const { firstName, lastName, oldEmail, newEmail, password } = req.body;
        const saltValue = await bcryptjs.genSalt(12);
        const hashedPassword = await bcryptjs.hash(password, saltValue);
        const user = await User.findOne({ _id: userId });
        const passwordsMatched = await bcryptjs.compare(password, user.password);
        const updatedUser = await User.findByIdAndUpdate(userId, {
            firstName,
            lastName,
            email: newEmail,
            password: hashedPassword
        }, { new: true });
        res.status(StatusCodes.OK).json({ updatedUser, email: oldEmail !== newEmail ? true : false, password: !passwordsMatched ? true : false });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getUserById = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId, { profilePic: 1, firstName: 1, lastName: 1 });
        if (!user) {
            throw new CustomError(StatusCodes.NOT_FOUND, "User does not exist.");
        }
        res.status(StatusCodes.OK).json(user);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export { putUpdateUserProfile, getUserById };