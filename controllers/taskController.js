// // // // import Task from "../models/Task.js";

// // // // export const getTasks = async (req, res) => {
// // // //   const tasks = await Task.find()
// // // //     .populate("projectId")
// // // //     .populate("assigneeId");
// // // //   res.json(tasks);
// // // // };

// // // // export const createTask = async (req, res) => {
// // // //   const task = new Task(req.body);
// // // //   await task.save();
// // // //   res.status(201).json(task);
// // // // };

// // // // export const updateTask = async (req, res) => {
// // // //   const task = await Task.findByIdAndUpdate(
// // // //     req.params.id,
// // // //     req.body,
// // // //     { new: true }
// // // //   );
// // // //   res.json(task);
// // // // };

// // // // export const deleteTask = async (req, res) => {
// // // //   await Task.findByIdAndDelete(req.params.id);
// // // //   res.json({ message: "Task deleted" });
// // // // };
// // // import Task from "../models/Task.js";

// // // // ✅ GET TASKS
// // // export const getTasks = async (req, res) => {
// // //   try {
// // //     const tasks = await Task.find();
// // //     res.json(tasks);
// // //   } catch (error) {
// // //     console.error("GET TASKS ERROR:", error.message);
// // //     res.status(500).json({ message: "Failed to fetch tasks" });
// // //   }
// // // };

// // // // ✅ CREATE TASK
// // // export const createTask = async (req, res) => {
// // //   try {
// // //     console.log("BODY:", req.body); // debug

// // //     const task = new Task(req.body);
// // //     await task.save();

// // //     res.status(201).json(task);
// // //   } catch (error) {
// // //     console.error("CREATE TASK ERROR:", error.message);

// // //     res.status(500).json({
// // //       message: "Failed to create task",
// // //       error: error.message,
// // //     });
// // //   }
// // // };

// // // // ✅ UPDATE TASK
// // // export const updateTask = async (req, res) => {
// // //   try {
// // //     const task = await Task.findByIdAndUpdate(
// // //       req.params.id,
// // //       req.body,
// // //       { new: true }
// // //     );

// // //     res.json(task);
// // //   } catch (error) {
// // //     console.error("UPDATE ERROR:", error.message);
// // //     res.status(500).json({ message: "Update failed" });
// // //   }
// // // };

// // // // ✅ DELETE TASK
// // // export const deleteTask = async (req, res) => {
// // //   try {
// // //     await Task.findByIdAndDelete(req.params.id);
// // //     res.json({ message: "Task deleted" });
// // //   } catch (error) {
// // //     console.error("DELETE ERROR:", error.message);
// // //     res.status(500).json({ message: "Delete failed" });
// // //   }
// // // };
// // import Task from "../models/Task.js";

// // // ================= GET TASKS =================
// // export const getTasks = async (req, res) => {
// //   try {
// //     const tasks = await Task.find().sort({ createdAt: -1 });

// //     res.json(tasks);
// //   } catch (error) {
// //     console.error("GET TASKS ERROR:", error.message);

// //     res.status(500).json({
// //       message: "Failed to fetch tasks",
// //     });
// //   }
// // };

// // // ================= CREATE TASK =================
// // export const createTask = async (req, res) => {
// //   try {
// //     const {
// //       title,
// //       description,
// //       projectId,
// //       assigneeId,
// //       priority,
// //       dueDate,
// //       status,
// //     } = req.body;

// //     // ✅ VALIDATION
// //     if (!title || title.trim() === "") {
// //       return res.status(400).json({
// //         message: "Title is required",
// //       });
// //     }

// //     const task = new Task({
// //       title,
// //       description: description || "",
// //       projectId: projectId || "1",
// //       assigneeId: assigneeId || "unassigned",
// //       priority: priority || "Medium",
// //       status: status || "Todo",
// //       dueDate: dueDate || null,
// //     });

// //     const savedTask = await task.save();

// //     res.status(201).json(savedTask);
// //   } catch (error) {
// //     console.error("CREATE TASK ERROR:", error.message);

// //     res.status(500).json({
// //       message: "Failed to create task",
// //       error: error.message,
// //     });
// //   }
// // };

// // // ================= UPDATE TASK =================
// // export const updateTask = async (req, res) => {
// //   try {
// //     const updatedTask = await Task.findByIdAndUpdate(
// //       req.params.id,
// //       req.body,
// //       {
// //         new: true,
// //         runValidators: true, // ✅ important
// //       }
// //     );

// //     if (!updatedTask) {
// //       return res.status(404).json({
// //         message: "Task not found",
// //       });
// //     }

// //     res.json(updatedTask);
// //   } catch (error) {
// //     console.error("UPDATE ERROR:", error.message);

// //     res.status(500).json({
// //       message: "Update failed",
// //     });
// //   }
// // };

// // // ================= DELETE TASK =================
// // export const deleteTask = async (req, res) => {
// //   try {
// //     const deleted = await Task.findByIdAndDelete(req.params.id);

// //     if (!deleted) {
// //       return res.status(404).json({
// //         message: "Task not found",
// //       });
// //     }

// //     res.json({
// //       message: "Task deleted successfully",
// //     });
// //   } catch (error) {
// //     console.error("DELETE ERROR:", error.message);

// //     res.status(500).json({
// //       message: "Delete failed",
// //     });
// //   }
// // };
// import Task from "../models/Task.js";

// // ================= GET TASKS =================
// export const getTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find().sort({
//       createdAt: -1,
//     });

//     res.json(tasks);

//   } catch (error) {
//     console.error("GET TASKS ERROR:", error.message);

//     res.status(500).json({
//       message: "Failed to fetch tasks",
//     });
//   }
// };

// // ================= CREATE TASK =================
// export const createTask = async (req, res) => {
//   try {
//     const {
//       title,
//       description,
//       projectId,
//       assigneeId,
//       priority,
//       dueDate,
//     } = req.body;

//     // VALIDATION
//     if (!title || title.trim() === "") {
//       return res.status(400).json({
//         message: "Title is required",
//       });
//     }

//     const task = new Task({
//       title,
//       description: description || "",
//       projectId,
//       assigneeId:
//         assigneeId || "unassigned",
//       priority: priority || "Medium",
//       status: "Todo",
//       dueDate: dueDate || null,
//     });

//     const savedTask = await task.save();

//     res.status(201).json(savedTask);

//   } catch (error) {
//     console.error(
//       "CREATE TASK ERROR:",
//       error.message
//     );

//     res.status(500).json({
//       message: "Failed to create task",
//       error: error.message,
//     });
//   }
// };

// // ================= UPDATE TASK =================
// export const updateTask = async (req, res) => {
//   try {
//     const updatedTask =
//       await Task.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         {
//           new: true,
//           runValidators: true,
//         }
//       );

//     if (!updatedTask) {
//       return res.status(404).json({
//         message: "Task not found",
//       });
//     }

//     res.json(updatedTask);

//   } catch (error) {
//     console.error(
//       "UPDATE ERROR:",
//       error.message
//     );

//     res.status(500).json({
//       message: "Update failed",
//     });
//   }
// };

// // ================= DELETE TASK =================
// export const deleteTask = async (req, res) => {
//   try {
//     const deleted =
//       await Task.findByIdAndDelete(
//         req.params.id
//       );

//     if (!deleted) {
//       return res.status(404).json({
//         message: "Task not found",
//       });
//     }

//     res.json({
//       message: "Task deleted successfully",
//     });

//   } catch (error) {
//     console.error(
//       "DELETE ERROR:",
//       error.message
//     );

//     res.status(500).json({
//       message: "Delete failed",
//     });
//   }
// };
import Task from "../models/Task.js";


// ================= GET TASKS =================
export const getTasks = async (
  req,
  res
) => {
  try {
    const tasks = await Task.find({
      workspaceId:
        req.user.workspaceId,
    }).sort({
      createdAt: -1,
    });

    res.json(tasks);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to fetch tasks",
    });
  }
};


// ================= CREATE TASK =================
export const createTask = async (
  req,
  res
) => {
  try {
    const {
      title,
      description,
      projectId,
      assigneeId,
      priority,
      dueDate,
    } = req.body;

    const task = new Task({
      title,
      description,
      projectId,
      assigneeId,
      priority,
      dueDate,

      workspaceId:
        req.user.workspaceId,
    });

    const savedTask =
      await task.save();

    res.status(201).json(
      savedTask
    );

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to create task",
    });
  }
};


// ================= UPDATE TASK =================
export const updateTask = async (
  req,
  res
) => {
  try {
    const updatedTask =
      await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.json(updatedTask);

  } catch (error) {
    res.status(500).json({
      message:
        "Update failed",
    });
  }
};


// ================= DELETE TASK =================
export const deleteTask = async (
  req,
  res
) => {
  try {
    await Task.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Task deleted",
    });

  } catch (error) {
    res.status(500).json({
      message:
        "Delete failed",
    });
  }
};