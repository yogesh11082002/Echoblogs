// "use client";
// import React, { useEffect, useRef } from "react";
// import { assets } from "../assets/assets";
// import { motion } from "framer-motion";
// import gsap from "gsap";
// import { useAppContext } from "../context/AppContext";

// const Navbar = () => {
//   const {navigate,token} =useAppContext();
//   const navRef = useRef(null);
//   const logoRef = useRef(null);
//   const buttonRef = useRef(null);

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

//   return (
//     <motion.div
//       ref={navRef}
//       className="flex justify-between items-center py-5 px-4 sm:px-20 xl:px-32 -mt-[25px] sm:-mt-[35px] w-full"
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8 }}
//     >
//       {/* Logo with hover scale effect */}
//       <motion.img
//         ref={logoRef}
//         onClick={() => navigate("/")}
//         src={assets.mylogo}
//         alt="logo"
//         className="w-40 sm:w-44 cursor-pointer"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//       />

//       {/* Login button with hover/tap effects */}
//       <motion.button
//         ref={buttonRef}
//         onClick={() => navigate("/admin")}
//         className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//       >
//        {token? 'Dashboard': 'Login'}
//         <motion.img
//           src={assets.arrow}
//           alt="arrow"
//           className="w-3"
//           whileHover={{ x: 5 }}
//           transition={{ type: "spring", stiffness: 300 }}
//         />
//       </motion.button>
//     </motion.div>
//   );
// };

// export default Navbar;

"use client";
import React, { useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useAppContext } from "../context/AppContext";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { navigate } = useAppContext();
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const buttonRef = useRef(null);
  const { user } = useUser(); // Clerk user
  const router = useNavigate();

  // GSAP entrance animation for Navbar elements
  useEffect(() => {
    gsap.from([logoRef.current, buttonRef.current], {
      y: -50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, []);

  // Redirect user to dashboard after login
  useEffect(() => {
    if (user) {
      // If you want to differentiate admin from normal users
      // Assume admin email is fixed for now
      const adminEmails = ["yogesh@gmail.com"]; 
      if (!adminEmails.includes(user.primaryEmailAddress.emailAddress)) {
        router("/dashboard"); // normal users go to dashboard
      }
    }
  }, [user, router]);

  return (
    <motion.div
      ref={navRef}
      className="flex justify-between items-center py-5 px-4 sm:px-20 xl:px-32 -mt-[25px] sm:-mt-[35px] w-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Logo */}
      <motion.img
        ref={logoRef}
        onClick={() => navigate("/")}
        src={assets.mylogo}
        alt="logo"
        className="w-40 sm:w-44 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      />

      {/* Login / Dashboard Button */}
      <motion.div ref={buttonRef}>
        <SignedOut>
          <SignInButton mode="modal">
            <motion.button
              className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
              <motion.img
                src={assets.arrow}
                alt="arrow"
                className="w-3"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </motion.button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          {/* User avatar + dropdown; clicking it shows logout */}
          <div className="flex items-center gap-2">
            <img
              src={user.profileImageUrl}
              alt="user avatar"
              className="w-8 h-8 rounded-full cursor-pointer"
              onClick={() => router("/dashboard")}
            />
            <span className="hidden sm:inline">{user.firstName}</span>
          </div>
        </SignedIn>
      </motion.div>
    </motion.div>
  );
};

export default Navbar;
