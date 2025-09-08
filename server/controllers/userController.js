import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import fs from "fs";
import imagekit from "../configs/imageKit.js";

// Get all blogs of the logged-in user
export const getMyBlogs = async (req, res) => {
  try {
    const userId = req.userId;
    const blogs = await Blog.find({ author: userId }).sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Create a blog for the logged-in user

export const createBlog = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res.json({ success: false, message: "All fields are required" });
    }

    // read file buffer
    const fileBuffer = fs.readFileSync(imageFile.path);

    // upload to ImageKit
    const uploadResponse = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    // optimize image
    const optimizedImageUrl = imagekit.url({
      path: uploadResponse.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    // save blog
    const blog = new Blog({
      title,
      subTitle,
      description,
      category,
      isPublished: isPublished || false,
      author: userId,
      image: optimizedImageUrl,
    });

    await blog.save();

    res.json({ success: true, message: "Blog created successfully!", blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// Delete a blog of the logged-in user
export const deleteBlog = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const blog = await Blog.findOne({ _id: id, author: userId });
    if (!blog) return res.json({ success: false, message: "Blog not found" });

    await Blog.findByIdAndDelete(id);
    res.json({ success: true, message: "Blog deleted" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const getCommentsOnMyBlogs = async (req, res) => {
  try {
    const userId = req.userId;

    // Get all blogs authored by the user
    const userBlogs = await Blog.find({ author: userId }).select("_id");

    const blogIds = userBlogs.map(b => b._id);

    // Get all comments on those blogs
    const comments = await Comment.find({ blog: { $in: blogIds } })
      .populate("blog", "title")   // Populate blog title
      .sort({ createdAt: -1 });    // Most recent first

    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// Get dashboard stats for the user
export const getUserDashboard = async (req, res) => {
  try {
    const userId = req.userId;

    const recentBlogs = await Blog.find({ author: userId }).sort({ createdAt: -1 }).limit(5);
    const totalBlogs = await Blog.countDocuments({ author: userId });
    const publishedBlogs = await Blog.countDocuments({ author: userId, isPublished: true });
    const draftBlogs = await Blog.countDocuments({ author: userId, isPublished: false });
    const totalComments = await Comment.countDocuments({ blog: { $in: recentBlogs.map(b => b._id) } });

    const dashboardData = {
      recentBlogs,
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      totalComments,
    };

    res.json({ success: true, dashboardData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const togglePublishBlog = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.json({ success: false, message: "Blog ID required" });

    const blog = await Blog.findOne({ _id: id, author: req.userId });
    if (!blog) return res.json({ success: false, message: "Blog not found" });

    blog.isPublished = !blog.isPublished;
    await blog.save();

    res.json({
      success: true,
      message: `Blog ${blog.isPublished ? "Published" : "Unpublished"}`,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// export const addUserComment = async (req, res) => {
//   try {
//     const { blog,name,content } = req.body;
//     await Comment.create({blog,name,content, 
//      author: userId,
//     });
   
//     res.json({ success: true, message: "Comment added for review" });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };