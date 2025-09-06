"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const Newsletter = () => {
  const inputRef = useRef(null);
  const buttonRef = useRef(null);

  // GSAP effects on mount + input focus
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener("focus", () => {
        gsap.to(inputRef.current, {
          boxShadow: "0 0 15px rgba(59,130,246,0.6)", // blue glow
          duration: 0.3,
        });
      });
      inputRef.current.addEventListener("blur", () => {
        gsap.to(inputRef.current, {
          boxShadow: "none",
          duration: 0.3,
        });
      });
    }

    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1.05,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "power1.inOut",
      });
    }
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center space-y-4 my-32 px-4"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Heading */}
      <motion.h1
        className="md:text-4xl text-2xl font-semibold"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Never Miss a Blog!
      </motion.h1>

      {/* Subtext */}
      <motion.p
        className="md:text-lg text-gray-500/70 pb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Subscribe to get the latest blog, new tech, and exclusive news.
      </motion.p>

      {/* Form */}
      <motion.form
        className="flex flex-col sm:flex-row items-center justify-between max-w-2xl w-full gap-4 sm:gap-0 md:h-13"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.7, ease: "backOut" }}
      >
        <input
          ref={inputRef}
          className="border border-gray-300 rounded-lg sm:rounded-r-none h-12 sm:h-full outline-none w-full px-4 text-gray-600"
          type="email"
          placeholder="Enter your email id"
          required
        />
        <button
          ref={buttonRef}
          type="submit"
          className="w-full sm:w-auto md:px-12 px-8 h-12 sm:h-full text-white font-medium bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-lg sm:rounded-l-none"
        >
          Subscribe
        </button>
      </motion.form>
    </motion.div>
  );
};

export default Newsletter;
