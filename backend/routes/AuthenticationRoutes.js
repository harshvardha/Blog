import { Router } from "express";
import { body } from "express-validator";
import { registerUser, loginUser } from "../controlers/AuthenticationController.js";

const authenticationRouter = Router();

// route for registering new user
authenticationRouter.post(
    "/register",
    [
        body("firstName").notEmpty().trim().isString(),
        body("lastName").notEmpty().trim().isString(),
        body("email").isEmail(),
        body("password").isLength({ min: 6 }).isString()
    ],
    registerUser
);

// route for login user
authenticationRouter.post(
    "/login",
    [
        body("email").isEmail(),
        body("passWord").isLength({ min: 6 }).isString()
    ],
    loginUser
);

export default authenticationRouter;