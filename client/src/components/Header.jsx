import React, { useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useAppContext } from "../context/AppContext";
import { X } from "lucide-react"; // ✅ icon for clear button

const Header = () => {
  const bgRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const formRef = useRef(null);

  const { input, setInput } = useAppContext();

  // ✅ Handle form submit
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  // GSAP background floating animation
  useEffect(() => {
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        y: 20,
        repeat: -1,
        yoyo: true,
        duration: 5,
        ease: "sine.inOut",
      });
    }
  }, []);

  // GSAP fade-in for header elements
  useEffect(() => {
    gsap.from([headingRef.current, subRef.current, formRef.current], {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative  mt-50">
      <div className="text-center mt-20 mb-8">
        <motion.h1
          ref={headingRef}
          className="text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Your Own <span className="text-primary">Blogging</span> <br /> Platform
        </motion.h1>

        <motion.p
          ref={subRef}
          className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          Welcome to your corner of the web—a place to explore ideas, express
          thoughts, and share your voice without limits.
        </motion.p>

        {/* ✅ Live Search Form */}
        <motion.form
          onSubmit={onSubmitHandler}
          ref={formRef}
          className="flex items-center max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          {/* Search Input */}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full pl-4 pr-10 outline-none"
            type="text"
            placeholder="Search for blog"
          />

          {/* ✅ Clear Button (only shows when input has text) */}
          {input && (
            <button
              type="button"
              onClick={() => setInput("")}
              className="absolute right-35 p-1 text-gray-500 hover:text-gray-700"
            >
              <X size={18} />
            </button>
          )}

          {/* Search Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-white px-8 py-2 m-1.5 rounded transition-all cursor-pointer"
            type="submit"
          >
            Search
          </motion.button>
        </motion.form>
      </div>

      {/* Floating BG */}
      <img
        ref={bgRef}
        src={assets.gradientBackground}
        alt="bg"
        className="absolute -top-50 -z-1 opacity-50"
      />
    </div>
  );
};

export default Header;
