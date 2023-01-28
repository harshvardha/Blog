import { Router } from "express";
import verifyAccessToken from "../middlewares/VerifyAccessToken.js";
import {
    postCreateBlog,
    getBlogById,
    putUpdateBlog,
    deleteBlog,
    getAllBlogs,
    getAllBlogsByUserId
} from "../controlers/BlogController.js";
import { body } from "express-validator";

const blogRouter = Router();

// route for creating a new blog
blogRouter.post(
    "/create",
    [
        body("title").notEmpty().isString(),
        body("thumbnail").notEmpty().isString().isURL(),
        body("content").notEmpty().isString()
    ],
    verifyAccessToken,
    postCreateBlog
);

// route for updating blog
blogRouter.put(
    "/update/:blogId",
    [
        body("title").notEmpty().isString(),
        body("thumbnail").notEmpty().isString().isURL(),
        body("content").notEmpty().isString()
    ],
    verifyAccessToken,
    putUpdateBlog
);

// route for deleting blog
blogRouter.delete("/delete/:blogId", verifyAccessToken, deleteBlog);

// route for getting blog by id
blogRouter.get("/blogById/:blogId", getBlogById);

// route for getting all blogs
blogRouter.get("/all", getAllBlogs);

// route for getting all blogs by userId
blogRouter.get("/blogsByUserId", verifyAccessToken, getAllBlogsByUserId);

export default blogRouter;