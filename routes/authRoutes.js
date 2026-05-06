// // import express from "express";
// // import jwt from "jsonwebtoken";
// // import User from "../models/User.js";
// // import { protect } from "../middleware/authMiddleware.js";

// // const router = express.Router();

// // // ✅ SIGNUP (SAFE + DEBUG)
// // router.post("/signup", async (req, res, next) => {
// //   try {
// //     console.log("SIGNUP BODY:", req.body);

// //     const { name, email, password, role } = req.body;

// //     if (!name || !email || !password) {
// //       return res.status(400).json({ message: "All fields required" });
// //     }

// //     const existingUser = await User.findOne({ email });

// //     if (existingUser) {
// //       return res.status(400).json({ message: "User already exists" });
// //     }

// //     const formattedRole =
// //       role && role.toLowerCase() === "admin" ? "Admin" : "Member";

// //     const user = await User.create({
// //       name,
// //       email,
// //       password,
// //       role: formattedRole,
// //     });

// //     console.log("USER CREATED:", user);

// //     return res.status(201).json({
// //       message: "User created",
// //       user,
// //     });

// //   } catch (error) {
// //     console.error("SIGNUP ERROR:", error); // 🔥 YOU WILL SEE REAL ERROR HERE
// //     return res.status(500).json({
// //       message: error.message || "Signup failed",
// //     });
// //   }
// // });


// // // ✅ LOGIN
// // router.post("/login", async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     const user = await User.findOne({ email });

// //     if (!user) {
// //       return res.status(400).json({ message: "User not found" });
// //     }

// //     const isMatch = await user.matchPassword(password);

// //     if (!isMatch) {
// //       return res.status(400).json({ message: "Invalid password" });
// //     }

// //     const token = jwt.sign(
// //       { id: user._id, role: user.role },
// //       process.env.JWT_SECRET,
// //       { expiresIn: "7d" }
// //     );

// //     return res.json({
// //       message: "Login success",
// //       token,
// //       user,
// //     });

// //   } catch (error) {
// //     console.error("LOGIN ERROR:", error);
// //     return res.status(500).json({
// //       message: error.message || "Login failed",
// //     });
// //   }
// // });


// // // ✅ CURRENT USER
// // router.get("/me", protect, (req, res) => {
// //   res.json(req.user);
// // });

// // export default router;
// // import express from "express";
// // import jwt from "jsonwebtoken";
// // import User from "../models/User.js";
// // import { protect } from "../middleware/authMiddleware.js";

// // const router = express.Router();


// // // =====================
// // // ✅ SIGNUP (SAFE VERSION)
// // // =====================
// // router.post("/signup", async (req, res) => {
// //   try {
// //     console.log("SIGNUP BODY:", req.body);

// //     const { name, email, password, role } = req.body;

// //     // 🔹 Validate input
// //     if (!name || !email || !password) {
// //       return res.status(400).json({ message: "All fields are required" });
// //     }

// //     // 🔹 Check existing user
// //     const existingUser = await User.findOne({ email });
// //     if (existingUser) {
// //       return res.status(400).json({ message: "User already exists" });
// //     }

// //     // 🔹 Normalize role
// //     const formattedRole =
// //       role === "Admin" ? "Admin" : "Member";

// //     // 🔹 Create user
// //     const user = new User({
// //       name,
// //       email,
// //       password, // hashed automatically in model
// //       role: formattedRole,
// //     });

// //     await user.save();

// //     console.log("USER CREATED:", user);

// //     return res.status(201).json({
// //       message: "User created successfully",
// //       user,
// //     });

// //   } catch (error) {
// //     console.error("SIGNUP ERROR:", error); // 🔥 THIS SHOWS REAL ERROR
// //     return res.status(500).json({
// //       message: error.message || "Signup failed",
// //     });
// //   }
// // });


// // // =====================
// // // ✅ LOGIN
// // // =====================
// // router.post("/login", async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     // 🔹 Find user
// //     const user = await User.findOne({ email });

// //     if (!user) {
// //       return res.status(400).json({ message: "User not found" });
// //     }

// //     // 🔹 Check password
// //     const isMatch = await user.matchPassword(password);

// //     if (!isMatch) {
// //       return res.status(400).json({ message: "Invalid password" });
// //     }

// //     // 🔹 Create token
// //     const token = jwt.sign(
// //       { id: user._id, role: user.role },
// //       process.env.JWT_SECRET,
// //       { expiresIn: "7d" }
// //     );

// //     return res.json({
// //       message: "Login successful",
// //       token,
// //       user,
// //     });

// //   } catch (error) {
// //     console.error("LOGIN ERROR:", error);
// //     return res.status(500).json({
// //       message: error.message || "Login failed",
// //     });
// //   }
// // });


// // // =====================
// // // ✅ GET CURRENT USER
// // // =====================
// // router.get("/me", protect, (req, res) => {
// //   res.json(req.user);
// // });


// // export default router;
// import express from "express";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();


// // =====================
// // ✅ SIGNUP
// // =====================
// router.post("/signup", async (req, res) => {
//   try {
//     console.log("SIGNUP BODY:", req.body);

//     const { name, email, password, role } = req.body;

//     // 🔹 Validation
//     if (!name || !email || !password) {
//       return res.status(400).json({
//         message: "All fields are required",
//       });
//     }

//     // 🔹 Check existing user
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         message: "User already exists",
//       });
//     }

//     // 🔹 Role normalize
//     const formattedRole =
//       role === "Admin" ? "Admin" : "Member";

//     // 🔹 Create user (password will be hashed automatically)
//     const user = new User({
//       name,
//       email,
//       password,
//       role: formattedRole,
//     });

//     await user.save();

//     console.log("USER CREATED:", user);

//     res.status(201).json({
//       message: "User created successfully",
//       user,
//     });

//   } catch (error) {
//     console.error("SIGNUP ERROR:", error);

//     res.status(500).json({
//       message: error.message || "Signup failed",
//     });
//   }
// });


// // =====================
// // ✅ LOGIN (FIXED)
// // =====================
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     console.log("LOGIN BODY:", req.body);

//     // 🔥 FIX: include password explicitly
//     const user = await User.findOne({ email }).select("+password");

//     if (!user) {
//       return res.status(400).json({
//         message: "User not found",
//       });
//     }

//     // 🔥 Safety check
//     if (!user.password) {
//       return res.status(500).json({
//         message: "Password not found in DB",
//       });
//     }

//     // 🔹 Compare password
//     const isMatch = await user.matchPassword(password);

//     if (!isMatch) {
//       return res.status(400).json({
//         message: "Invalid password",
//       });
//     }

//     // 🔹 Generate JWT
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     // 🔥 Remove password before sending response
//     user.password = undefined;

//     res.json({
//       message: "Login successful",
//       token,
//       user,
//     });

//   } catch (error) {
//     console.error("LOGIN ERROR:", error);

//     res.status(500).json({
//       message: error.message || "Login failed",
//     });
//   }
// });


// // =====================
// // ✅ GET CURRENT USER
// // =====================
// router.get("/me", protect, (req, res) => {
//   res.json(req.user);
// });


// export default router;
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// =====================
// SIGNUP
// =====================
router.post("/signup", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      workspaceId,
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // ✅ NEW WORKSPACE FOR ADMIN
    const finalWorkspaceId =
      role === "Admin"
        ? new mongoose.Types.ObjectId().toString()
        : workspaceId;

    const user = new User({
      name,
      email,
      password,
      role,
      workspaceId: finalWorkspaceId,
    });

    await user.save();

    res.status(201).json({
      message: "Signup successful",
      user,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});


// =====================
// LOGIN
// =====================
router.post("/login", async (req, res) => {
  try {
    const { email, password } =
      req.body;

    const user = await User.findOne({
      email,
    }).select("+password");

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch =
      await user.matchPassword(
        password
      );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    user.password = undefined;

    res.json({
      message: "Login successful",
      token,
      user,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Login failed",
    });
  }
});


// =====================
// CURRENT USER
// =====================
router.get(
  "/me",
  protect,
  (req, res) => {
    res.json(req.user);
  }
);

export default router;