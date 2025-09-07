// import express from "express";
// import { userAuth } from "../middleware/userAuth.js";
// import { getMyBlogs, createBlog, deleteBlog } from "../controllers/blogController.js";
// import { getCommentsOnMyBlogs } from "../controllers/blogController.js";

// const router = express.Router();

// // Blogs
// router.get("/blog/my-blogs", userAuth, getMyBlogs);
// router.post("/blog", userAuth, createBlog);
// router.delete("/blog/:id", userAuth, deleteBlog);

// // Comments
// router.get("/comments/my-blogs", userAuth, getCommentsOnMyBlogs);

// export default router;
import express from "express";
import { userAuth } from "../middleware/userAuth.js";
import {
  getMyBlogs,
  createBlog,
  deleteBlog,
  getCommentsOnMyBlogs,
} from "../controllers/blogController.js";

const userRouter = express.Router();

// Blogs
userRouter.get("/blog/my-blogs", userAuth, getMyBlogs);
userRouter.post("/blog", userAuth, createBlog);
userRouter.delete("/blog/:id", userAuth, deleteBlog);

// Comments
userRouter.get("/comments/my-blogs", userAuth, getCommentsOnMyBlogs);

export default userRouter;
