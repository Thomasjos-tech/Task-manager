// // // import express from "express";
// // // import User from "../models/User.js";
// // // import { protect, isAdmin } from "../middleware/authMiddleware.js";

// // // const router = express.Router();

// // // // ✅ GET USERS
// // // router.get("/users", protect, isAdmin, async (req, res) => {
// // //   const users = await User.find();
// // //   res.json(users);
// // // });

// // // // ✅ INVITE USER
// // // router.post("/invite", async (req, res) => {
// // //   try {
// // //     const { name, email, password, role, projects } = req.body;

// // //     const user = new User({
// // //       name,
// // //       email,
// // //       password,
// // //       role,
// // //       projects: projects || [], // ✅ ADD THIS LINE
// // //     });

// // //     await user.save();

// // //     res.json(user);
// // //   } catch (err) {
// // //     res.status(500).json({ message: "Invite failed" });
// // //   }
// // // });

// // // // ✅ CHANGE ROLE
// // // router.put("/role/:id", protect, isAdmin, async (req, res) => {
// // //   const { role } = req.body;

// // //   const user = await User.findById(req.params.id);
// // //   if (!user) return res.status(404).json({ message: "User not found" });

// // //   user.role = role;
// // //   await user.save();

// // //   res.json({ message: "Role updated" });
// // // });

// // // // ✅ Assign / Update project for user
// // // router.put("/projects/:id", async (req, res) => {
// // //   try {
// // //     const { projects } = req.body;

// // //     const user = await User.findByIdAndUpdate(
// // //       req.params.id,
// // //       { projects },
// // //       { new: true }
// // //     );

// // //     if (!user) {
// // //       return res.status(404).json({ message: "User not found" });
// // //     }

// // //     res.json(user);
// // //   } catch (err) {
// // //     console.error(err);
// // //     res.status(500).json({ message: "Update failed" });
// // //   }
// // // });
// // // // ✅ DELETE USER
// // // router.delete("/user/:id", protect, isAdmin, async (req, res) => {
// // //   await User.findByIdAndDelete(req.params.id);
// // //   res.json({ message: "User deleted" });
// // // });

// // // export default router;
// // import express from "express";

// // import User from "../models/User.js";

// // import {
// //   protect,
// //   isAdmin,
// // } from "../middleware/authMiddleware.js";

// // const router = express.Router();


// // // ===============================
// // // GET USERS
// // // ===============================
// // router.get(
// //   "/users",
// //   protect,
// //   isAdmin,
// //   async (req, res) => {
// //     try {

// //       // ✅ ONLY SAME WORKSPACE USERS
// //       const users =
// //         await User.find({
// //           workspaceId:
// //             req.user.workspaceId,
// //         });

// //       res.json(users);

// //     } catch (err) {
// //       console.error(err);

// //       res.status(500).json({
// //         message:
// //           "Failed to fetch users",
// //       });
// //     }
// //   }
// // );


// // // ===============================
// // // INVITE USER
// // // ===============================
// // router.post(
// //   "/invite",
// //   protect,
// //   isAdmin,
// //   async (req, res) => {
// //     try {
// //       const {
// //         name,
// //         email,
// //         password,
// //         role,
// //         projects,
// //         workspaceId,
// //       } = req.body;

// //       // ✅ CHECK EXISTING
// //       const existingUser =
// //         await User.findOne({
// //           email,
// //         });

// //       if (existingUser) {
// //         return res.status(400).json({
// //           message:
// //             "User already exists",
// //         });
// //       }

// //       // ✅ CREATE USER
// //       const user = new User({
// //         name,
// //         email,
// //         password,

// //         role:
// //           role === "Admin"
// //             ? "Admin"
// //             : "Member",

// //         projects:
// //           projects || [],

// //         // ✅ IMPORTANT
// //         workspaceId,
// //       });

// //       await user.save();

// //       res.status(201).json(user);

// //     } catch (err) {
// //       console.error(err);

// //       res.status(500).json({
// //         message:
// //           err.message ||
// //           "Invite failed",
// //       });
// //     }
// //   }
// // );


// // // ===============================
// // // CHANGE ROLE
// // // ===============================
// // router.put(
// //   "/role/:id",
// //   protect,
// //   isAdmin,
// //   async (req, res) => {
// //     try {
// //       const { role } = req.body;

// //       const user =
// //         await User.findOne({
// //           _id: req.params.id,

// //           workspaceId:
// //             req.user.workspaceId,
// //         });

// //       if (!user) {
// //         return res.status(404).json({
// //           message:
// //             "User not found",
// //         });
// //       }

// //       user.role = role;

// //       await user.save();

// //       res.json({
// //         message:
// //           "Role updated",
// //       });

// //     } catch (err) {
// //       console.error(err);

// //       res.status(500).json({
// //         message:
// //           "Update failed",
// //       });
// //     }
// //   }
// // );


// // // ===============================
// // // UPDATE USER PROJECT
// // // ===============================
// // router.put(
// //   "/projects/:id",
// //   protect,
// //   isAdmin,
// //   async (req, res) => {
// //     try {
// //       const { projects } = req.body;

// //       const user =
// //         await User.findOneAndUpdate(
// //           {
// //             _id: req.params.id,

// //             workspaceId:
// //               req.user.workspaceId,
// //           },

// //           {
// //             projects,
// //           },

// //           {
// //             new: true,
// //           }
// //         );

// //       if (!user) {
// //         return res.status(404).json({
// //           message:
// //             "User not found",
// //         });
// //       }

// //       res.json(user);

// //     } catch (err) {
// //       console.error(err);

// //       res.status(500).json({
// //         message:
// //           "Update failed",
// //       });
// //     }
// //   }
// // );


// // // ===============================
// // // DELETE USER
// // // ===============================
// // router.delete(
// //   "/user/:id",
// //   protect,
// //   isAdmin,
// //   async (req, res) => {
// //     try {

// //       await User.findOneAndDelete({
// //         _id: req.params.id,

// //         workspaceId:
// //           req.user.workspaceId,
// //       });

// //       res.json({
// //         message:
// //           "User deleted",
// //       });

// //     } catch (err) {
// //       console.error(err);

// //       res.status(500).json({
// //         message:
// //           "Delete failed",
// //       });
// //     }
// //   }
// // );

// // export default router;
// import express from "express";
// import User from "../models/User.js";
// import {
//   protect,
//   isAdmin,
// } from "../middleware/authMiddleware.js";

// const router = express.Router();


// // ================= GET USERS =================
// router.get(
//   "/users",
//   protect,
//   async (req, res) => {
//     try {

//       // ✅ ONLY SAME WORKSPACE USERS
//       const users = await User.find({
//         workspaceId:
//           req.user.workspaceId,
//       }).select("-password");

//       res.json(users);

//     } catch (error) {
//       console.error(error);

//       res.status(500).json({
//         message:
//           "Failed to fetch users",
//       });
//     }
//   }
// );


// // ================= INVITE USER =================
// router.post(
//   "/invite",
//   protect,
//   async (req, res) => {
//     try {

//       const {
//         name,
//         email,
//         password,
//         role,
//       } = req.body;

//       // ✅ CHECK EXISTING
//       const existingUser =
//         await User.findOne({
//           email,
//         });

//       if (existingUser) {
//         return res.status(400).json({
//           message:
//             "User already exists",
//         });
//       }

//       // ✅ SAME WORKSPACE
//       const user = new User({
//         name,
//         email,
//         password,
//         role,

//         workspaceId:
//           req.user.workspaceId,
//       });

//       await user.save();

//       res.status(201).json(user);

//     } catch (err) {
//       console.error(err);

//       res.status(500).json({
//         message:
//           "Invite failed",
//       });
//     }
//   }
// );


// // ================= CHANGE ROLE =================
// router.put(
//   "/role/:id",
//   protect,
//   isAdmin,
//   async (req, res) => {
//     try {

//       const { role } = req.body;

//       const user =
//         await User.findById(
//           req.params.id
//         );

//       if (!user) {
//         return res.status(404).json({
//           message:
//             "User not found",
//         });
//       }

//       // ✅ SECURITY
//       if (
//         user.workspaceId !==
//         req.user.workspaceId
//       ) {
//         return res.status(403).json({
//           message:
//             "Access denied",
//         });
//       }

//       user.role = role;

//       await user.save();

//       res.json({
//         message:
//           "Role updated",
//       });

//     } catch (error) {
//       console.error(error);

//       res.status(500).json({
//         message:
//           "Role update failed",
//       });
//     }
//   }
// );


// // ================= DELETE USER =================
// router.delete(
//   "/user/:id",
//   protect,
//   isAdmin,
//   async (req, res) => {
//     try {

//       const user =
//         await User.findById(
//           req.params.id
//         );

//       if (!user) {
//         return res.status(404).json({
//           message:
//             "User not found",
//         });
//       }

//       // ✅ SECURITY
//       if (
//         user.workspaceId !==
//         req.user.workspaceId
//       ) {
//         return res.status(403).json({
//           message:
//             "Access denied",
//         });
//       }

//       await User.findByIdAndDelete(
//         req.params.id
//       );

//       res.json({
//         message:
//           "User deleted",
//       });

//     } catch (error) {
//       console.error(error);

//       res.status(500).json({
//         message:
//           "Delete failed",
//       });
//     }
//   }
// );

// export default router;
import express from "express";
import User from "../models/User.js";
import Project from "../models/Project.js";

import {
  protect,
  isAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();


// ================= GET USERS =================
router.get(
  "/users",
  protect,
  async (req, res) => {
    try {

      // ✅ SAME WORKSPACE ONLY
      const users = await User.find({
        workspaceId:
          req.user.workspaceId,
      }).select("-password");

      res.json(users);

    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to fetch users",
      });
    }
  }
);


// ================= INVITE USER =================
router.post(
  "/invite",
  protect,
  async (req, res) => {
    try {

      const {
        name,
        email,
        password,
        role,
        projects,
      } = req.body;

      // ✅ CHECK EXISTING
      const existingUser =
        await User.findOne({
          email,
        });

      if (existingUser) {
        return res.status(400).json({
          message:
            "User already exists",
        });
      }

      // ✅ CREATE USER
      const user = new User({
        name,
        email,
        password,
        role,
        projects: projects || [],

        // ✅ IMPORTANT
        workspaceId:
          req.user.workspaceId,
      });

      await user.save();

      res.status(201).json(user);

    } catch (err) {
      console.error(err);

      res.status(500).json({
        message:
          "Invite failed",
      });
    }
  }
);


// ================= CHANGE ROLE =================
router.put(
  "/role/:id",
  protect,
  isAdmin,
  async (req, res) => {
    try {

      const { role } = req.body;

      const user =
        await User.findById(
          req.params.id
        );

      if (!user) {
        return res.status(404).json({
          message:
            "User not found",
        });
      }

      // ✅ SECURITY
      if (
        user.workspaceId !==
        req.user.workspaceId
      ) {
        return res.status(403).json({
          message:
            "Access denied",
        });
      }

      user.role = role;

      await user.save();

      res.json({
        message:
          "Role updated",
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Role update failed",
      });
    }
  }
);


// ================= UPDATE PROJECT =================
router.put(
  "/projects/:id",
  protect,
  async (req, res) => {
    try {

      const { projects } = req.body;

      const user =
        await User.findById(
          req.params.id
        );

      if (!user) {
        return res.status(404).json({
          message:
            "User not found",
        });
      }

      // ✅ SECURITY
      if (
        user.workspaceId !==
        req.user.workspaceId
      ) {
        return res.status(403).json({
          message:
            "Access denied",
        });
      }

      user.projects = projects;

      await user.save();

      // ✅ ADD USER TO PROJECT MEMBERS
      if (Array.isArray(projects)) {
        // Add user to members of assigned projects
        for (const projectId of projects) {
          await Project.findByIdAndUpdate(
            projectId,
            { $addToSet: { members: user._id } },
            { new: true }
          );
        }
      }

      res.json(user);

    } catch (err) {
      console.error(err);

      res.status(500).json({
        message:
          "Update failed",
      });
    }
  }
);


// ================= DELETE USER =================
router.delete(
  "/user/:id",
  protect,
  isAdmin,
  async (req, res) => {
    try {

      const user =
        await User.findById(
          req.params.id
        );

      if (!user) {
        return res.status(404).json({
          message:
            "User not found",
        });
      }

      // ✅ SECURITY
      if (
        user.workspaceId !==
        req.user.workspaceId
      ) {
        return res.status(403).json({
          message:
            "Access denied",
        });
      }

      await User.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "User deleted",
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Delete failed",
      });
    }
  }
);

export default router;