import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";

const BlogCard = ({ blog }) => {
  const { title, description, category, image, _id } = blog;
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const imgRef = useRef(null);

  // GSAP reveal animation on mount
  useEffect(() => {
    gsap.from(cardRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
    gsap.from(imgRef.current, {
      scale: 1.2,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onClick={() => navigate(`/blog/${_id}`)}
      className="w-full rounded-lg overflow-hidden shadow hover:shadow-primary/25 duration-300 cursor-pointer bg-white"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      {/* Image */}
      <motion.img
        ref={imgRef}
        src={image}
        alt={title}
        className="aspect-video w-full object-cover"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
      />

      {/* Category */}
      <motion.span
        className="ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {category}
      </motion.span>

      {/* Content */}
      <div className="p-5">
        <motion.h5
          className="mb-2 font-medium text-gray-900"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {title}
        </motion.h5>

       <motion.p
          className="mb-3 text-xs text-gray-600"
          dangerouslySetInnerHTML={{ __html: description.slice(0, 80) }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        ></motion.p>
      </div>
    </motion.div>
  );
};

export default BlogCard;
