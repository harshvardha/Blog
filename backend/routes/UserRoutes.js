import { Router } from "express";
import { body } from "express-validator";
import { putUpdateUserProfile, getUserById } from "../controlers/UserController.js";
import verifyAccessToken from "../middlewares/VerifyAccessToken.js";

const userRouter = Router();

userRouter.put(
    "/updateProfile",
    [
        body("firstName").notEmpty().trim().isString(),
        body("lastName").notEmpty().trim().isString(),
        body("oldEmail").isEmail(),
        body("newEmail").isEmail(),
        body("password").isLength({ min: 6 }).isString(),
        body("profilePic").isString().isURL()
    ],
    verifyAccessToken,
    putUpdateUserProfile);

// route to get user by id
userRouter.get("/:userId", getUserById);

export default userRouter;