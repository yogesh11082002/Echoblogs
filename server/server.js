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
import cors from "cors";

const app = express();

// Allow requests from your frontend
app.use(cors({
  origin: "https://echoblog-yogesh.vercel.app",  // your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Your routes
app.use("/api/blog", blogRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running...");
});
