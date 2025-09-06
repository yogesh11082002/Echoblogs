import React, { useState, useEffect, useRef } from "react";
import { blogCategories } from "../assets/assets";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const highlightRef = useRef(null);
  const { blogs, input } = useAppContext();

  // GSAP animation for the highlight bubble
  useEffect(() => {
    if (highlightRef.current) {
      gsap.to(highlightRef.current, {
        duration: 0.3,
        scale: 1.1,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      });
    }
  }, [menu]);

  // ✅ Filtering logic (search + category)
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      input === "" ||
      blog.title.toLowerCase().includes(input.toLowerCase()) ||
      blog.category.toLowerCase().includes(input.toLowerCase());

    const matchesCategory =
      menu === "All" || blog.category.toLowerCase() === menu.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* ✅ Category Buttons */}
      <div className="w-full overflow-x-auto no-scrollbar">
        <div className="flex gap-3 sm:gap-6 my-6 px-4 sm:px-0 sm:justify-center">
          {blogCategories.map((item) => (
            <div key={item} className="relative flex-shrink-0">
              <motion.button
                onClick={() => setMenu(item)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`cursor-pointer text-gray-500 relative px-4 py-1 rounded-full whitespace-nowrap ${
                  menu === item ? "text-white" : ""
                }`}
              >
                {item}
                {menu === item && (
                  <motion.div
                    ref={highlightRef}
                    className="absolute left-0 right-0 top-0 bottom-0 bg-primary rounded-full -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                )}
              </motion.button>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Blog Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <AnimatePresence mode="wait">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <motion.div
                key={blog._id}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
              >
                <BlogCard blog={blog} />
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No blogs found 🚀
            </p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default BlogList;
