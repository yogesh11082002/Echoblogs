// import React, { useEffect, useRef } from "react";
// import { assets } from "../assets/assets";
// import { motion } from "framer-motion";
// import gsap from "gsap";
// import { useAppContext } from "../context/AppContext";
// import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const { navigate } = useAppContext();
//   const navRef = useRef(null);
//   const logoRef = useRef(null);
//   const buttonRef = useRef(null);
//   const { isSignedIn, user } = useUser(); // Clerk user
//   const router = useNavigate();

//   // GSAP entrance animation for Navbar elements
//   useEffect(() => {
//     gsap.from([logoRef.current, buttonRef.current], {
//       y: -50,
//       opacity: 0,
//       duration: 1,
//       stagger: 0.2,
//       ease: "power3.out",
//     });
//   }, []);

//   // Redirect user to dashboard after login
//   useEffect(() => {
//     if (isSignedIn && user) {
//       const adminEmails = ["yogesh@gmail.com"];
//       if (!adminEmails.includes(user.primaryEmailAddress?.emailAddress)) {
//         router("/dashboard"); // normal users go to dashboard
//       }
//     }
//   }, [isSignedIn, user, router]);

//   return (
//     <motion.div
//       ref={navRef}
//       className="flex justify-between items-center py-5 px-4 sm:px-20 xl:px-32 -mt-[25px] sm:-mt-[35px] w-full"
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8 }}
//     >
//       {/* Logo */}
//       <motion.img
//         ref={logoRef}
//         onClick={() => navigate("/")}
//         src={assets.mylogo}
//         alt="logo"
//         className="w-40 sm:w-44 cursor-pointer"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//       />

//       {/* Login / Dashboard Button */}
//       <motion.div ref={buttonRef}>
//         <SignedOut>
//           <SignInButton mode="modal">
//             <motion.button
//               className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Login
//               <motion.img
//                 src={assets.arrow}
//                 alt="arrow"
//                 className="w-3"
//                 whileHover={{ x: 5 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//               />
//             </motion.button>
//           </SignInButton>
//         </SignedOut>

//         <SignedIn>
//           {/* User avatar + dropdown; safely handle missing profile image */}
//           <div className="flex items-center gap-2 cursor-pointer" onClick={() => router("/dashboard")}>
//             <img
//               src={user?.profileImageUrl || assets.defaultAvatar} // fallback avatar
//               alt="user avatar"
//               className="w-8 h-8 rounded-full"
//             />
//             <span className="hidden sm:inline">{user?.firstName || "User"}</span>
//           </div>
//         </SignedIn>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default Navbar;

import React, { useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { motion } from "framer-motion";
import gsap from "gsap";

const Navbar = () => {
  const navigate = useNavigate();
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const { user, isSignedIn } = useUser();

  const adminEmails = ["yogesh@gmail.com"];

  // Animate on mount
  useEffect(() => {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  // Scroll effect
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
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 z-50 w-full flex justify-between items-center px-4 sm:px-20 xl:px-32 -mt-6 sm:-mt-10 transition-all duration-300 ${
        scrolled
          ? "py-4 bg-white/20 backdrop-blur-lg shadow-md"
          : "py-4 sm:py-6 bg-transparent"
      }`}
    >
      {/* Logo */}
      <motion.img
        onClick={() => navigate("/")}
        src={assets.mylogo}
        alt="logo"
        className="w-32 sm:w-40 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200 }}
      />

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Signed Out → Show Sign In */}
        <SignedOut>
          <SignInButton mode="modal">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-6 py-2.5"
            >
              Get started <ArrowRight className="w-4 h-4" />
            </motion.button>
          </SignInButton>
        </SignedOut>

        {/* Signed In → Show Dashboard & UserButton */}
        <SignedIn>
          {isSignedIn && user && (
            <>
              <motion.button
                onClick={() =>
                  adminEmails.includes(user.primaryEmailAddress?.emailAddress)
                    ? navigate("/admin")
                    : navigate("/dashboard")
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-6 py-2.5"
              >
                Dashboard <ArrowRight className="w-4 h-4" />
              </motion.button>
              <UserButton />
            </>
          )}
        </SignedIn>
      </div>
    </motion.div>
  );
};

export default Navbar;
