// import React, { useEffect, useRef, useState } from "react";
// import { assets } from "../assets/assets";
// import { useNavigate, useLocation } from "react-router-dom";
// import { ArrowRight } from "lucide-react";
// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   UserButton,
// } from "@clerk/clerk-react";
// import { motion } from "framer-motion";
// import gsap from "gsap";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation(); // ✅ Get current route
//   const navRef = useRef(null);
//   const [scrolled, setScrolled] = useState(false);

//   // Animate on mount
//   useEffect(() => {
//     gsap.from(navRef.current, {
//       y: -100,
//       opacity: 0,
//       duration: 0.8,
//       ease: "power3.out",
//     });
//   }, []);

//   // Scroll effect
//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <motion.div
//       ref={navRef}
//       initial={{ opacity: 0, y: -40 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8, ease: "easeOut" }}
//       className={`fixed top-0 z-50 w-full flex justify-between items-center px-4 sm:px-20 xl:px-32 -mt-6 sm:-mt-10 transition-all duration-300 ${
//         scrolled
//           ? "py-4 bg-white/20 backdrop-blur-lg shadow-md"
//           : "py-4 sm:py-6 bg-transparent"
//       }`}
//     >
//       {/* Logo */}
//       <motion.img
//         onClick={() => navigate("/")} // ✅ Always go home
//         src={assets.mylogo}
//         alt="logo"
//         className="w-36 sm:w-40 cursor-pointer"
//         whileHover={{ scale: 1.05 }}
//         transition={{ type: "spring", stiffness: 200 }}
//       />

//       {/* Right Side */}
//       <div className="flex items-center gap-4 mr-5">
//         {/* Signed Out → Show Sign In */}
//         <SignedOut>
//           <SignInButton mode="modal">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-6 mr-6 py-2.5"
//             >
//               login <ArrowRight className="w-4 h-4" />
//             </motion.button>
//           </SignInButton>
//         </SignedOut>

//         {/* Signed In → Show Dashboard Button + UserButton */}
//         <SignedIn>
//           {/* ✅ Show Dashboard button only if NOT on /dashboard */}
//           {location.pathname !== "/dashboard" && (
//             <motion.button
//               onClick={() => navigate("/dashboard")}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="rounded-full text-sm cursor-pointer bg-primary text-white px-5 py-2.5"
//             >
//               Dashboard
//             </motion.button>
//           )}

//           {/* User Profile */}
//           <UserButton />
//         </SignedIn>
//       </div>
//     </motion.div>
//   );
// };

// export default Navbar;

import React, { useEffect, useRef, useState, Suspense } from "react";
import { assets } from "../assets/assets";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Get current route
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  // ✅ Scroll effect only
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      ref={navRef}
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 z-50 w-full flex justify-between items-center px-4 sm:px-20 xl:px-32 -mt-6 sm:-mt-10 transition-all duration-300 ${
        scrolled
          ? "py-4 bg-white/10 backdrop-blur-sm shadow-sm" // ✅ lighter blur/shadow
          : "py-4 sm:py-6 bg-transparent"
      }`}
    >
      {/* Logo */}
      <motion.img
        onClick={() => navigate("/")} // ✅ Always go home
        src={assets.mylogo}
        alt="logo"
        loading="eager"
        fetchpriority="high" // ✅ logo loads instantly
        className="w-36 sm:w-40 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200 }}
      />

      {/* Right Side */}
      <div className="flex items-center gap-4 mr-5">
        {/* ✅ Clerk wrapped in Suspense for faster hydration */}
        <Suspense fallback={null}>
          {/* Signed Out → Show Sign In */}
          <SignedOut>
            <SignInButton mode="modal">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-6 mr-6 py-2.5"
              >
                login <ArrowRight className="w-4 h-4" />
              </motion.button>
            </SignInButton>
          </SignedOut>

          {/* Signed In → Show Dashboard Button + UserButton */}
          <SignedIn>
            {/* ✅ Show Dashboard button only if NOT on /dashboard */}
            {location.pathname !== "/dashboard" && (
              <motion.button
                onClick={() => navigate("/dashboard")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full text-sm cursor-pointer bg-primary text-white px-5 py-2.5"
              >
                Dashboard
              </motion.button>
            )}

            {/* User Profile */}
            <UserButton />
          </SignedIn>
        </Suspense>
      </div>
    </motion.div>
  );
};

export default Navbar;
