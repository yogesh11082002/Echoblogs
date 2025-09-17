// // middleware/userAuth.js
// import { verifyToken } from "@clerk/clerk-sdk-node";

// export const userAuth = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader)
//       return res.status(401).json({ success: false, message: "No token provided" });

//     const token = authHeader.replace("Bearer ", "");

//     const decoded = await verifyToken(token, {
//       secretKey: process.env.CLERK_SECRET_KEY,
//     });

//     req.user = decoded.sub; // Clerk userId
//     next();
//   } catch (error) {
//     console.error("Auth error:", error);
//     res.status(401).json({ success: false, message: "Unauthorized" });
//   }
// };
// middleware/userAuth.js

import { verifyToken } from "@clerk/clerk-sdk-node";

export const userAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ success: false, message: "No token provided" });

    const token = authHeader.replace("Bearer ", "");

    const decoded = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    // Set userId for controllers
    req.userId = decoded.sub; // Clerk user ID

    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
