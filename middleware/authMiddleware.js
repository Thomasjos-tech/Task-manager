import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ✅ PROTECT MIDDLEWARE
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;

    next(); // ✅ REQUIRED
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


// ✅ ADMIN MIDDLEWARE
export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  if (req.user.role !== "Admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  next(); // ✅ REQUIRED
};