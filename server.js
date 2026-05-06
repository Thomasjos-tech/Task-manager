// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";

// import authRoutes from "./routes/authRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";

// dotenv.config();

// const app = express();

// // ✅ Middlewares
// app.use(cors());
// app.use(express.json());

// // ✅ Health check
// app.get("/", (req, res) => {
//   res.send("API Running 🚀");
// });

// // ✅ Database connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error("MongoDB Error:", err));

// // ✅ Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminRoutes);

// // ❗ Optional: 404 handler (nice to have)
// app.use((req, res) => {
//   res.status(404).json({ message: "Route not found" });
// });

// // ✅ Global error handler (IMPORTANT)
// app.use((err, req, res, next) => {
//   console.error("ERROR:", err);

//   if (res.headersSent) {
//     return next(err);
//   }

//   res.status(err.status || 500).json({
//     message: err.message || "Internal Server Error",
//   });
// });

// // ✅ Start server
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";

// import authRoutes from "./routes/authRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import taskRoutes from "./routes/taskRoutes.js"; // ✅ NEW

// dotenv.config();

// const app = express();

// // ✅ Middlewares
// app.use(cors());
// app.use(express.json());

// // 🔥 DEBUG: Log all incoming requests
// app.use((req, res, next) => {
//   console.log(`🔵 ${req.method} ${req.path}`);
//   next();
// });

// // ✅ Health check
// app.get("/", (req, res) => {
//   res.send("API Running 🚀");
// });

// // ✅ Database connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error("MongoDB Error:", err));

// // ✅ Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/tasks", taskRoutes); // ✅ NEW ROUTE
// app.use((req, res) => {
//   res.status(404).json({ message: "Route not found" });
// });

// // ✅ Global error handler
// app.use((err, req, res, next) => {
//   console.error("ERROR:", err);

//   if (res.headersSent) {
//     return next(err);
//   }

//   res.status(err.status || 500).json({
//     message: err.message || "Internal Server Error",
//   });
// });

// // ✅ Start server
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();

const app = express();

// ✅ CORS (allow your frontend)
app.use(
  cors({
    origin: "http://localhost:8080", // your frontend
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());

// 🔥 DEBUG: log every request
app.use((req, res, next) => {
  console.log(`🔵 ${req.method} ${req.originalUrl}`);
  next();
});

// ✅ Health check
app.get("/", (req, res) => {
  res.send("API CHANGED 🚀🔥"); // 👈 change to confirm correct server
});

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// 🔥 ROUTES (ORDER MATTERS)
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

console.log("🔥 TASK ROUTE LOADED"); // 👈 DEBUG
app.use("/api/tasks", taskRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/dashboard", dashboardRoutes);

// ❗ 404 handler (must be LAST)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ❗ Global error handler
app.use((err, req, res, next) => {
  console.error("❌ ERROR:", err);

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});




