// middleware/userAuth.js
import { clerkClient } from "@clerk/clerk-sdk-node";

export const userAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ success: false, message: "No token provided" });

    const token = authHeader; // Clerk frontend sends token in `Authorization`

    const session = await clerkClient.sessions.verifySession(token);
    if (!session) return res.status(401).json({ success: false, message: "Invalid token" });

    // attach logged-in user to request
    req.user = session.userId;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
