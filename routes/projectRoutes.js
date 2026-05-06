// import express from "express";
// import {
//   getProjects,
//   createProject,
//   updateProject,
//   deleteProject,
//   addMember,
//   removeMember,
// } from "../controllers/projectController.js";

// const router = express.Router();

// router.get("/", getProjects);
// router.post("/", createProject);
// router.put("/:id", updateProject);
// router.delete("/:id", deleteProject);

// // members
// router.post("/:id/add-member", addMember);
// router.post("/:id/remove-member", removeMember);

// export default router;
import express from "express";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  addMember,
  removeMember,
} from "../controllers/projectController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getProjects);

router.post("/", protect, createProject);

router.put("/:id", protect, updateProject);

router.delete("/:id", protect, deleteProject);

router.post(
  "/:id/add-member",
  protect,
  addMember
);

router.post(
  "/:id/remove-member",
  protect,
  removeMember
);

export default router;