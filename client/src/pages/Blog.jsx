// import { useParams } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import gsap from "gsap";
// import { useAppContext } from "../context/AppContext";
// import { toast } from "react-hot-toast";
// import { assets } from "../assets/assets";

// const Blog = () => {
//   const { id } = useParams();
//   const { axios } = useAppContext(); 

//   const [blog, setBlog] = useState(null);
//   const [comments, setComments] = useState([]);

//   // ✅ Fetch blog
//   const fetchBlogData = async () => {
//     try {
//       const res = await axios.get(`/api/blog/${id}`);
//       if (res.data.success) {
//         setBlog(res.data.blog);
//       } else {
//         toast.error(res.data.message || "Failed to load blog");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     }
//   };

//   // ✅ Fetch comments
//   const fetchComments = async (blogId) => {
//     try {
//       const res = await axios.post("/api/blog/comments", { blogId :id });
//       if (res.data.success && Array.isArray(res.data.comments)) {
//         setComments(res.data.comments);
//       } else {
//         setComments([]);
//       }
//     } catch (error) {
//       setComments([]);
//       toast.error(error.response?.data?.message || error.message);
//     }
//   };

//   // ✅ Load blog + comments
//   useEffect(() => {
//     if (id) {
//       fetchBlogData();
//       fetchComments(id);
//     }
//   }, [id]);

//   // ✅ Animate description
//   useEffect(() => {
//     if (blog) {
//       const elements = document.querySelectorAll(
//         ".blog-description p, .blog-description h1, .blog-description h2, .blog-description h3, .blog-description ul, .blog-description ol, .blog-description blockquote"
//       );

//       if (elements.length > 0) {
//         gsap.from(elements, {
//           opacity: 0,
//           y: 30,
//           duration: 0.6,
//           stagger: 0.2,
//         });
//       }
//     }
//   }, [blog]);

//   // ✅ Add comment
//  const handleAddComment = async (e) => {
//   e.preventDefault();
//   const name = e.target.name.value.trim();
//   const content = e.target.comment.value.trim();

//   if (!name || !content) return;

//   try {
//     const res = await axios.post(`/api/blog/add-comment`, {
//       blog: id,
//       name,
//       content,
//     });

//     if (res.data.success) {
//       // ✅ show backend message ("Comment added for review")
//       toast.success(res.data.message || "Comment added!");

//       // refresh comments
//       await fetchComments(id);
//       e.target.reset();
//     } else {
//       toast.error(res.data.message || "Failed to add comment");
//     }
//   } catch (error) {
//     toast.error(error.response?.data?.message || error.message);
//   }
// };



//   if (!blog) {
//     return (
//       <div className="text-center py-20">
//         <h2 className="text-2xl font-semibold text-gray-700">Blog Not Found</h2>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar />

//       <div className="mx-5 max-w-3xl md:mx-auto my-12 space-y-12 text-gray-800">
//         {/* Blog Header */}
//         <motion.div
//           className="text-center space-y-4"
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//         >
//           <p className="text-primary uppercase tracking-wide text-sm">
//             Published on {new Date(blog.createdAt).toDateString()}
//           </p>
//           <motion.h1
//             className="text-4xl font-extrabold leading-tight"
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.9, ease: "backOut" }}
//           >
//             {blog.title}
//           </motion.h1>
//           <motion.h2
//             className="text-xl font-medium text-gray-600"
//             dangerouslySetInnerHTML={{ __html: blog.subTitle }}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3, duration: 0.7 }}
//           />
//           <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-semibold">
//             {blog.category}
//           </span>
//         </motion.div>

//         {/* Image */}
//         <motion.img
//           src={blog.image}
//           alt={blog.title}
//           className="rounded-xl shadow-md w-full object-cover"
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 1 }}
//         />

//         {/* Blog Description */}
//         <div
//           className="blog-description mx-auto leading-relaxed text-gray-700"
//           dangerouslySetInnerHTML={{ __html: blog.description }}
//         />

//         {/* Comments */}
//         <motion.div
//           className="space-y-6"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//         >
//           <h3 className="text-2xl font-semibold border-b pb-2">
//             Comments ({comments.length})
//           </h3>
//           {comments.length === 0 ? (
//             <p className="italic text-gray-500">No comments yet.</p>
//           ) : (
//             comments.map((c, index) => (
//               <motion.div
//                 key={c?._id || index}
//                 className="bg-gray-50 border rounded-lg p-4 shadow-sm"
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: index * 0.2 }}
//               >
//                 <p className="font-medium">{c?.name || "Anonymous"}</p>
//                 <p className="text-gray-600">{c?.content || "No content"}</p>
//                 <span className="text-xs text-gray-400">
//                   {c?.createdAt
//                     ? new Date(c.createdAt).toDateString()
//                     : "Just now"}
//                 </span>
//               </motion.div>
//             ))
//           )}
//         </motion.div>

//         {/* Add Comment */}
//         <motion.div
//           className="space-y-4"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//         >
//           <h2 className="text-xl font-semibold">Add your comment</h2>
//           <form onSubmit={handleAddComment} className="flex flex-col gap-4">
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               className="w-full border p-3 rounded-md focus:ring-2 focus:ring-primary outline-none"
//               required
//             />
//             <textarea
//               rows="4"
//               name="comment"
//               placeholder="Comment"
//               className="w-full border p-3 rounded-md focus:ring-2 focus:ring-primary outline-none"
//               required
//             />
//             <button
//               type="submit"
//               className="bg-primary text-white py-2 px-6 rounded-md hover:scale-105 transition-transform"
//             >
//               Submit
//             </button>
//           </form>
//         </motion.div>
//         {/* Share Section */}
//       <motion.div
//           className="space-y-4 text-center"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 1 }}
//         >
//           <p className="text-lg font-semibold text-gray-700">
//             Share this article on social media
//           </p>
//           <div className="flex justify-center gap-6">
//             <motion.img
//               src={assets.facebook_icon}
//               width="40"
//               alt="Facebook"
//               className="cursor-pointer"
//               whileHover={{ scale: 1.2, rotate: 5 }}
//             />
//             <motion.img
//               src={assets.twitter_icon}
//               width="40"
//               alt="Twitter"
//               className="cursor-pointer"
//               whileHover={{ scale: 1.2, rotate: -5 }}
//             />
//             <motion.img
//               src={assets.googleplus_icon}
//               width="40"
//               alt="Google"
//               className="cursor-pointer"
//               whileHover={{ scale: 1.2, rotate: 5 }}
//             />
//           </div>
//         </motion.div>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default Blog;

// import { useParams } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import gsap from "gsap";
// import { useAppContext } from "../context/AppContext";
// import { toast } from "react-hot-toast";
// import { assets } from "../assets/assets";

// const Blog = () => {
//   const { id } = useParams();
//   const { axios } = useAppContext(); 

//   const [blog, setBlog] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(true); // ✅ Added loading state

//   // ✅ Fetch blog
//   const fetchBlogData = async () => {
//     setLoading(true); // start loading
//     try {
//       const res = await axios.get(`/api/blog/${id}`);
//       if (res.data.success) {
//         setBlog(res.data.blog);
//       } else {
//         toast.error(res.data.message || "Failed to load blog");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     }
//     setLoading(false); // stop loading
//   };

//   // ✅ Fetch comments
//   const fetchComments = async (blogId) => {
//     try {
//       const res = await axios.post("/api/blog/comments", { blogId: id });
//       if (res.data.success && Array.isArray(res.data.comments)) {
//         setComments(res.data.comments);
//       } else {
//         setComments([]);
//       }
//     } catch (error) {
//       setComments([]);
//       toast.error(error.response?.data?.message || error.message);
//     }
//   };

//   // ✅ Load blog + comments
//   useEffect(() => {
//     if (id) {
//       fetchBlogData();
//       fetchComments(id);
//     }
//   }, [id]);

//   // ✅ Animate description
//   useEffect(() => {
//     if (blog) {
//       const elements = document.querySelectorAll(
//         ".blog-description p, .blog-description h1, .blog-description h2, .blog-description h3, .blog-description ul, .blog-description ol, .blog-description blockquote"
//       );

//       if (elements.length > 0) {
//         gsap.from(elements, {
//           opacity: 0,
//           y: 30,
//           duration: 0.6,
//           stagger: 0.2,
//         });
//       }
//     }
//   }, [blog]);

//   // ✅ Add comment
//   const handleAddComment = async (e) => {
//     e.preventDefault();
//     const name = e.target.name.value.trim();
//     const content = e.target.comment.value.trim();

//     if (!name || !content) return;

//     try {
//       const res = await axios.post(`/api/blog/add-comment`, {
//         blog: id,
//         name,
//         content,
//       });

//       if (res.data.success) {
//         toast.success(res.data.message || "Comment added!");
//         await fetchComments(id);
//         e.target.reset();
//       } else {
//         toast.error(res.data.message || "Failed to add comment");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     }
//   };

//   // ✅ Loading Animation
//   if (loading) {
//     return (
//       <>
//         <Navbar />
//         <div className="mx-5 max-w-3xl md:mx-auto my-12 space-y-8 animate-pulse">
//           <div className="h-6 bg-gray-200 rounded w-1/3"></div>
//           <div className="h-10 bg-gray-300 rounded w-2/3"></div>
//           <div className="h-5 bg-gray-200 rounded w-1/4"></div>
//           <div className="h-64 bg-gray-300 rounded-xl"></div>
//           <div className="space-y-4">
//             {[...Array(3)].map((_, i) => (
//               <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
//             ))}
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   if (!blog) {
//     return (
//       <div className="text-center py-20">
//         <h2 className="text-2xl font-semibold text-gray-700">Blog Not Found</h2>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       {/* 🔽 Your existing blog code stays exactly the same 🔽 */}
//       <div className="mx-5 max-w-3xl md:mx-auto my-12 space-y-12 text-gray-800">
//         {/* Blog Header */}
//         <motion.div
//           className="text-center space-y-4"
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//         >
//           <p className="text-primary uppercase tracking-wide text-sm">
//             Published on {new Date(blog.createdAt).toDateString()}
//           </p>
//           <motion.h1
//             className="text-4xl font-extrabold leading-tight"
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.9, ease: "backOut" }}
//           >
//             {blog.title}
//           </motion.h1>
//           <motion.h2
//             className="text-xl font-medium text-gray-600"
//             dangerouslySetInnerHTML={{ __html: blog.subTitle }}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3, duration: 0.7 }}
//           />
//           <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-semibold">
//             {blog.category}
//           </span>
//         </motion.div>

//         {/* Image */}
//         <motion.img
//           src={blog.image}
//           alt={blog.title}
//           className="rounded-xl shadow-md w-full object-cover"
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 1 }}
//         />

//         {/* Blog Description */}
//         <div
//           className="blog-description mx-auto leading-relaxed text-gray-700"
//           dangerouslySetInnerHTML={{ __html: blog.description }}
//         />

//         {/* Comments */}
//         {/* ✅ Your existing comments and form remain unchanged */}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Blog;

import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import { assets } from "../assets/assets";

const Blog = () => {
  const { id } = useParams();
  const { axios } = useAppContext();

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch blog
  const fetchBlogData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/blog/${id}`);
      if (res.data.success) {
        setBlog(res.data.blog);
      } else {
        toast.error(res.data.message || "Failed to load blog");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
    setLoading(false);
  };

  // ✅ Fetch comments
  const fetchComments = async () => {
    try {
      const res = await axios.post("/api/blog/comments", { blogId: id });
      if (res.data.success && Array.isArray(res.data.comments)) {
        setComments(res.data.comments);
      } else {
        setComments([]);
      }
    } catch (error) {
      setComments([]);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ✅ Load blog + comments
  useEffect(() => {
    if (id) {
      fetchBlogData();
      fetchComments();
    }
  }, [id]);

  // ✅ Animate description
  useEffect(() => {
    if (blog) {
      const elements = document.querySelectorAll(
        ".blog-description p, .blog-description h1, .blog-description h2, .blog-description h3, .blog-description ul, .blog-description ol, .blog-description blockquote"
      );

      if (elements.length > 0) {
        gsap.from(elements, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.2,
        });
      }
    }
  }, [blog]);

  // ✅ Add comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const content = e.target.comment.value.trim();

    if (!name || !content) return;

    try {
      const res = await axios.post(`/api/blog/add-comment`, {
        blog: id,
        name,
        content,
      });

      if (res.data.success) {
        toast.success(res.data.message || "Comment added!");
        await fetchComments();
        e.target.reset();
      } else {
        toast.error(res.data.message || "Failed to add comment");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ✅ Loading Animation
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="mx-5 max-w-3xl md:mx-auto my-12 space-y-8 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-10 bg-gray-300 rounded w-2/3"></div>
          <div className="h-5 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-300 rounded-xl"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
            ))}
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-gray-700">Blog Not Found</h2>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="mx-5 max-w-3xl md:mx-auto my-12 space-y-12 text-gray-800">
        {/* Blog Header */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-primary uppercase tracking-wide text-sm">
            Published on {new Date(blog.createdAt).toDateString()}
          </p>
          <motion.h1
            className="text-4xl font-extrabold leading-tight"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: "backOut" }}
          >
            {blog.title}
          </motion.h1>
          <motion.h2
            className="text-xl font-medium text-gray-600"
            dangerouslySetInnerHTML={{ __html: blog.subTitle }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          />
          <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-semibold">
            {blog.category}
          </span>
        </motion.div>

        {/* Image */}
        <motion.img
          src={blog.image}
          alt={blog.title}
          className="rounded-xl shadow-md w-full object-cover"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Blog Description */}
        <div
          className="blog-description mx-auto leading-relaxed text-gray-700"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />

        {/* Comments */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-semibold border-b pb-2">
            Comments ({comments.length})
          </h3>
          {comments.length === 0 ? (
            <p className="italic text-gray-500">No comments yet.</p>
          ) : (
            comments.map((c, index) => (
              <motion.div
                key={c?._id || index}
                className="bg-gray-50 border rounded-lg p-4 shadow-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <p className="font-medium">{c?.name || "Anonymous"}</p>
                <p className="text-gray-600">{c?.content || "No content"}</p>
                <span className="text-xs text-gray-400">
                  {c?.createdAt
                    ? new Date(c.createdAt).toDateString()
                    : "Just now"}
                </span>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Add Comment Form */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-xl font-semibold">Add your comment</h2>
          <form onSubmit={handleAddComment} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-primary outline-none"
              required
            />
            <textarea
              rows="4"
              name="comment"
              placeholder="Comment"
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-primary outline-none"
              required
            />
            <button
              type="submit"
              className="bg-primary text-white py-2 px-6 rounded-md hover:scale-105 transition-transform"
            >
              Submit
            </button>
          </form>
        </motion.div>

        {/* Share Section */}
        <motion.div
          className="space-y-4 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="text-lg font-semibold text-gray-700">
            Share this article on social media
          </p>
          <div className="flex justify-center gap-6">
            <motion.img
              src={assets.facebook_icon}
              width="40"
              alt="Facebook"
              className="cursor-pointer"
              whileHover={{ scale: 1.2, rotate: 5 }}
            />
            <motion.img
              src={assets.twitter_icon}
              width="40"
              alt="Twitter"
              className="cursor-pointer"
              whileHover={{ scale: 1.2, rotate: -5 }}
            />
            <motion.img
              src={assets.googleplus_icon}
              width="40"
              alt="Google"
              className="cursor-pointer"
              whileHover={{ scale: 1.2, rotate: 5 }}
            />
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
