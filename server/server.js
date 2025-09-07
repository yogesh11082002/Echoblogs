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

const app = express();

// Connect to DB
await connectDB();

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow Postman / mobile apps
      if (origin === "https://echoblog-yogesh.vercel.app") return callback(null, true);
      callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("API is working"));

// Admin routes (JWT protected)
app.use("/api/admin", adminRouter);

// Blog routes
app.use("/api/blog", blogRouter);

export default app;
