import { StatusCodes } from "http-status-codes";
import Blog from "../models/Blog.js";
import CustomError from "../errors/CustomError.js";
import { validationResult } from "express-validator";

const postCreateBlog = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new CustomError(StatusCodes.BAD_REQUEST, "Please provide all the details correctly.");
        }
        const { title, thumbnail, content } = req.body;
        const userId = req.userId;
        const newBlog = await Blog.create({
            userId,
            title,
            thumbnail,
            content
        });
        res.status(StatusCodes.CREATED).json({ newBlog });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getBlogById = async (req, res, next) => {
    try {
        const blogId = req.params.blogId;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            throw new CustomError(StatusCodes.NOT_FOUND, "Blog does not exist.");
        }
        res.status(StatusCodes.OK).json(blog);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const putUpdateBlog = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new CustomError(StatusCodes.BAD_REQUEST, "Please provide all the details correctly.");
        }
        const { title, thumbnail, content } = req.body;
        const blogId = req.params.blogId;
        const userId = req.userId;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            throw new CustomError(StatusCodes.NOT_FOUND, "Blog not found.");
        }
        if (blog.userId.toString() !== userId) {
            throw new CustomError(StatusCodes.UNAUTHORIZED, "You can only edit your own blogs.");
        }
        const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
            title,
            thumbnail,
            content
        }, { new: true });
        res.status(StatusCodes.OK).json(updatedBlog);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const deleteBlog = async (req, res, next) => {
    try {
        const blogId = req.query.blogId;
        const userId = req.userId;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            throw new CustomError(StatusCodes.BAD_REQUEST, "Blog does not exist.");
        }
        if (blog.userId !== userId) {
            throw new CustomError(StatusCodes.UNAUTHORIZED, "You can only delete your own blogs.");
        }
        await Blog.findByIdAndDelete(blogId);
        res.status(StatusCodes.OK).json({ message: "Blog Deleted." });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getAllBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find({}, { _id: 1, title: 1, thumbnail: 1 });
        res.status(StatusCodes.OK).json(blogs);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getAllBlogsByUserId = async (req, res, next) => {
    try {
        const userId = req.userId;
        const blogs = await Blog.find({ userId: userId }, { _id: 1, title: 1, thumbnail: 1 });
        if (!blogs) {
            throw new CustomError(StatusCodes.NOT_FOUND, "This user has not posted anything.")
        }
        res.status(StatusCodes.OK).json(blogs);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export {
    postCreateBlog,
    getBlogById,
    putUpdateBlog,
    deleteBlog,
    getAllBlogs,
    getAllBlogsByUserId
};