// import express from "express";
// import "dotenv/config";
// import cors from "cors";
// import connectDB from "./configs/db.js";
// import adminRouter from "./routes/adminRoutes.js";
// import blogRouter from "./routes/blogRoutes.js";

// const app = express();

// // Connect to DB before handling requests
// await connectDB();

// // Middlewares
// app.use(
//   cors({
//     origin: ["https://echoblog-yogesh.vercel.app"], // replace with your frontend URL
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// app.use(express.json());

// // Routes
// app.get("/", (req, res) => res.send("API is working"));
// app.use("/api/admin", adminRouter);
// app.use("/api/blog", blogRouter);

// // ❌ Remove app.listen() — not needed for Vercel
// // ✅ Just export the app
// export default app;

import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Connect to DB before handling requests
await connectDB();

// Middlewares
app.use(
  cors({
    origin: ["https://echoblog-yogesh.vercel.app"], // replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("API is working"));
app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);
app.use("/api", userRoutes);

// ❌ Remove app.listen() — not needed for Vercel
// ✅ Just export the app
export default app;
