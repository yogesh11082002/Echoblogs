import express from "express";
import { userAuth } from "../middleware/userAuth.js";
import { getMyBlogs, createBlog, deleteBlog } from "../controllers/blogController.js";
import { getCommentsOnMyBlogs } from "../controllers/commentController.js";

const router = express.Router();

// Blogs
router.get("/blog/my-blogs", userAuth, getMyBlogs);
router.post("/blog", userAuth, createBlog);
router.delete("/blog/:id", userAuth, deleteBlog);

// Comments
router.get("/comments/my-blogs", userAuth, getCommentsOnMyBlogs);

export default router;
