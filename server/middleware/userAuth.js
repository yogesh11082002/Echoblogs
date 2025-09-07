import { Clerk } from "@clerk/clerk-sdk-node";

const clerk = new Clerk({ apiKey: process.env.CLERK_API_KEY });

const userAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ success: false, message: "No token found" });

    // Verify Clerk session token
    const session = await clerk.sessions.verifySessionToken(token);
    if (!session) return res.status(401).json({ success: false, message: "Invalid token" });

    req.userId = session.userId; // attach userId for routes
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export default userAuth;
