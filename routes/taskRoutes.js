// // import express from "express";
// // import {
// //   getTasks,
// //   createTask,
// //   updateTask,
// //   deleteTask,
// // } from "../controllers/taskController.js";

// // const router = express.Router();

// // router.get("/", getTasks);
// // router.post("/", createTask);
// // router.put("/:id", updateTask);
// // router.delete("/:id", deleteTask);

// // export default router;
// import express from "express";

// import {
//   getTasks,
//   createTask,
//   updateTask,
//   deleteTask,
// } from "../controllers/taskController.js";

// const router = express.Router();

// router.get("/", getTasks);

// router.post("/", createTask);

// router.put("/:id", updateTask);

// router.delete("/:id", deleteTask);

// export default router;
import express from "express";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getTasks);

router.post("/", protect, createTask);

router.put("/:id", protect, updateTask);

router.delete("/:id", protect, deleteTask);

export default router;