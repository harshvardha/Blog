import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
dotenv.config();

const verifyAccessToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (!authHeader?.startsWith("Bearer")) {
            return res.sendStatus(StatusCodes.UNAUTHORIZED);
        }
        const accessToken = authHeader.split(" ")[1];
        jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET,
            (error, user) => {
                if (error) {
                    res.sendStatus(StatusCodes.UNAUTHORIZED);
                    throw error;
                }
                req.userId = user.id;
                next();
            }
        )
    } catch (error) {
        console.log(error);
    }
}

export default verifyAccessToken;