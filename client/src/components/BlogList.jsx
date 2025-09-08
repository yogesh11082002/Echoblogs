// import React, { useState, useEffect, useRef } from "react";
// import { blogCategories } from "../assets/assets";
// import { motion, AnimatePresence } from "framer-motion";
// import gsap from "gsap";
// import BlogCard from "./BlogCard";
// import { useAppContext } from "../context/AppContext";

// const BlogList = () => {
//   const [menu, setMenu] = useState("All");
//   const highlightRef = useRef(null);
//   const { blogs, input } = useAppContext();

//   // GSAP animation for the highlight bubble
//   useEffect(() => {
//     if (highlightRef.current) {
//       gsap.to(highlightRef.current, {
//         duration: 0.3,
//         scale: 1.1,
//         ease: "power2.out",
//         yoyo: true,
//         repeat: 1,
//       });
//     }
//   }, [menu]);

//   // ✅ Filtering logic (search + category)
//   const filteredBlogs = blogs.filter((blog) => {
//     const matchesSearch =
//       input === "" ||
//       blog.title.toLowerCase().includes(input.toLowerCase()) ||
//       blog.category.toLowerCase().includes(input.toLowerCase());

//     const matchesCategory =
//       menu === "All" || blog.category.toLowerCase() === menu.toLowerCase();

//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <div>
//       {/* ✅ Category Buttons */}
//       <div className="w-full overflow-x-auto no-scrollbar">
//         <div className="flex gap-3 sm:gap-6 my-6 px-4 sm:px-0 sm:justify-center">
//           {blogCategories.map((item) => (
//             <div key={item} className="relative flex-shrink-0">
//               <motion.button
//                 onClick={() => setMenu(item)}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className={`cursor-pointer text-gray-500 relative px-4 py-1 rounded-full whitespace-nowrap ${
//                   menu === item ? "text-white" : ""
//                 }`}
//               >
//                 {item}
//                 {menu === item && (
//                   <motion.div
//                     ref={highlightRef}
//                     className="absolute left-0 right-0 top-0 bottom-0 bg-primary rounded-full -z-10"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.3 }}
//                   ></motion.div>
//                 )}
//               </motion.button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ✅ Blog Grid */}
//       <motion.div
//         className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40"
//         initial="hidden"
//         animate="visible"
//         variants={{
//           hidden: {},
//           visible: {
//             transition: {
//               staggerChildren: 0.15,
//             },
//           },
//         }}
//       >
//         <AnimatePresence mode="wait">
//           {filteredBlogs.length > 0 ? (
//             filteredBlogs.map((blog) => (
//               <motion.div
//                 key={blog._id}
//                 variants={{
//                   hidden: { opacity: 0, y: 30, scale: 0.95 },
//                   visible: { opacity: 1, y: 0, scale: 1 },
//                 }}
//                 transition={{ duration: 0.5, ease: "easeOut" }}
//                 exit={{ opacity: 0, y: -20, scale: 0.9 }}
//               >
//                 <BlogCard blog={blog} />
//               </motion.div>
//             ))
//           ) : (
//             <p className="col-span-full text-center text-gray-500">
//               No blogs found 🚀
//             </p>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </div>
//   );
// };

// export default BlogList;


// import React, { useState, useEffect, useRef } from "react";
// import { blogCategories } from "../assets/assets";
// import { motion, AnimatePresence } from "framer-motion";
// import gsap from "gsap";
// import BlogCard from "./BlogCard";
// import { useAppContext } from "../context/AppContext";

// const BlogList = () => {
//   const [menu, setMenu] = useState("All");
//   const [visibleCategories, setVisibleCategories] = useState(blogCategories.slice(0, 5));
//   const [showMoreDropdown, setShowMoreDropdown] = useState(false);
//   const highlightRef = useRef(null);
//   const { blogs, input } = useAppContext();

//   // Update visible categories based on screen size
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024) {
//         setVisibleCategories(blogCategories.slice(0, 5)); // large screens: first 5
//       } else {
//         setVisibleCategories(blogCategories); // small screens: all
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // GSAP animation for the highlight bubble
//   useEffect(() => {
//     if (highlightRef.current) {
//       gsap.to(highlightRef.current, {
//         duration: 0.3,
//         scale: 1.1,
//         ease: "power2.out",
//         yoyo: true,
//         repeat: 1,
//       });
//     }
//   }, [menu]);

//   // Filtering logic
//   const filteredBlogs = blogs.filter((blog) => {
//     const matchesSearch =
//       input === "" ||
//       blog.title.toLowerCase().includes(input.toLowerCase()) ||
//       blog.category.toLowerCase().includes(input.toLowerCase());

//     const matchesCategory =
//       menu === "All" || blog.category.toLowerCase() === menu.toLowerCase();

//     return matchesSearch && matchesCategory;
//   });

//   const remainingCategories =
//     window.innerWidth >= 1024 ? blogCategories.slice(5) : [];

//   return (
//     <div>
//       {/* Category Buttons */}
//       <div className="w-full overflow-x-auto no-scrollbar relative">
//         <div className="flex gap-3 sm:gap-6 my-6 px-4 sm:px-0 sm:justify-center items-center">
//           {visibleCategories.map((item) => (
//             <div key={item} className="relative flex-shrink-0">
//               <motion.button
//                 onClick={() => setMenu(item)}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className={`cursor-pointer text-gray-500 relative px-4 py-1 rounded-full whitespace-nowrap ${
//                   menu === item ? "text-white" : ""
//                 }`}
//               >
//                 {item}
//                 {menu === item && (
//                   <motion.div
//                     ref={highlightRef}
//                     className="absolute left-0 right-0 top-0 bottom-0 bg-primary rounded-full -z-10"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.3 }}
//                   />
//                 )}
//               </motion.button>
//             </div>
//           ))}

//           {/* More button for large screens */}
//           {remainingCategories.length > 0 && (
//             <div className="relative flex-shrink-0">
//               <motion.button
//                 onClick={() => setShowMoreDropdown((prev) => !prev)}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="cursor-pointer text-gray-500 relative px-4 py-1 rounded-full whitespace-nowrap bg-gray-100 hover:bg-gray-200"
//               >
//                 More
//               </motion.button>

//               {/* Animated dropdown */}
//               <AnimatePresence>
//                 {showMoreDropdown && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     transition={{ duration: 0.25, ease: "easeOut" }}
//                     className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg z-20"
//                   >
//                     {remainingCategories.map((item) => (
//                       <button
//                         key={item}
//                         onClick={() => {
//                           setMenu(item);
//                           setShowMoreDropdown(false);
//                         }}
//                         className={`block px-4 py-2 w-full text-left text-gray-700 hover:bg-gray-100 ${
//                           menu === item ? "font-semibold text-primary" : ""
//                         }`}
//                       >
//                         {item}
//                       </button>
//                     ))}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Blog Grid */}
//       <motion.div
//         className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40"
//         initial="hidden"
//         animate="visible"
//         variants={{
//           hidden: {},
//           visible: { transition: { staggerChildren: 0.15 } },
//         }}
//       >
//         <AnimatePresence mode="wait">
//           {filteredBlogs.length > 0 ? (
//             filteredBlogs.map((blog) => (
//               <motion.div
//                 key={blog._id}
//                 variants={{
//                   hidden: { opacity: 0, y: 30, scale: 0.95 },
//                   visible: { opacity: 1, y: 0, scale: 1 },
//                 }}
//                 transition={{ duration: 0.5, ease: "easeOut" }}
//                 exit={{ opacity: 0, y: -20, scale: 0.9 }}
//               >
//                 <BlogCard blog={blog} />
//               </motion.div>
//             ))
//           ) : (
//             <p className="col-span-full text-center text-gray-500">
//               No blogs found 🚀
//             </p>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </div>
//   );
// };

// export default BlogList;

import React, { useState, useEffect, useRef } from "react";
import { blogCategories } from "../assets/assets";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const [showMore, setShowMore] = useState(false);
  const highlightRef = useRef(null);
  const { blogs, input } = useAppContext();

  // ✅ Track screen size
  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ GSAP animation for highlight bubble
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

  // ✅ Filtering logic
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      input === "" ||
      blog.title.toLowerCase().includes(input.toLowerCase()) ||
      blog.category.toLowerCase().includes(input.toLowerCase());

    const matchesCategory =
      menu === "All" || blog.category.toLowerCase() === menu.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // ✅ Split categories for large screens
  const firstFive = blogCategories.slice(0, 5);
  const remaining = blogCategories.slice(5);

  return (
    <div>
      {/* ✅ Category Buttons */}
      <div className="w-full overflow-x-auto no-scrollbar relative">
        <div className="flex gap-3 sm:gap-6 my-6 px-4 sm:px-0 sm:justify-center items-center flex-nowrap lg:flex-wrap">
          {/* Small screen → show ALL categories, scrollable */}
          {!isLargeScreen &&
            blogCategories.map((item) => (
              <motion.button
                key={item}
                onClick={() => setMenu(item)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`cursor-pointer text-gray-500 relative px-4 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${
                  menu === item ? "bg-primary text-white" : "hover:bg-gray-100"
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
                  />
                )}
              </motion.button>
            ))}

          {/* Large screen → show first 5 + More */}
          {isLargeScreen && (
            <>
              {firstFive.map((item) => (
                <motion.button
                  key={item}
                  onClick={() => setMenu(item)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`cursor-pointer text-gray-500 relative px-4 py-1 rounded-full whitespace-nowrap ${
                    menu === item
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100"
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
                    />
                  )}
                </motion.button>
              ))}

              {!showMore ? (
                <motion.button
                  onClick={() => setShowMore(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer text-gray-500 relative px-4 py-1 rounded-full whitespace-nowrap bg-gray-100 hover:bg-gray-200"
                >
                  More
                </motion.button>
              ) : (
                <>
                  {remaining.map((item) => (
                    <motion.button
                      key={item}
                      onClick={() => setMenu(item)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`cursor-pointer text-gray-500 relative px-4 py-1 rounded-full whitespace-nowrap ${
                        menu === item
                          ? "bg-primary text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {item}
                    </motion.button>
                  ))}
                  <motion.button
                    onClick={() => setShowMore(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer text-gray-500 relative px-4 py-1 rounded-full whitespace-nowrap bg-gray-100 hover:bg-gray-200"
                  >
                    Show Less
                  </motion.button>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* ✅ Blog Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
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
