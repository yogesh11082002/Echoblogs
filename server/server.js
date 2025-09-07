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

// import express from "express";
// import "dotenv/config";
// import cors from "cors";
// import connectDB from "./configs/db.js";
// import adminRouter from "./routes/adminRoutes.js";
// import blogRouter from "./routes/blogRoutes.js";
// import userRoutes from "./routes/userRoutes.js";

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
// app.use("/api", userRoutes);

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

// CORS middleware
const allowedOrigins = [
  "https://echoblog-yogesh.vercel.app", // your frontend
  "http://localhost:3000",              // local dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Manually handle preflight requests
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("API is working"));
app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);
app.use("/api", userRoutes);

// ✅ Export app for Vercel
export default app;
