// import Project from "../models/Project.js";
// import Task from "../models/Task.js";
// import User from "../models/User.js";

// // helper for overdue
// const isOverdue = (task) => {
//   if (!task.dueDate) return false;
//   return new Date(task.dueDate) < new Date() && task.status !== "Done";
// };

// export const getDashboard = async (req, res) => {
//   try {
//     // ================= DATA =================
//     const projects = await Project.find();
//     const tasks = await Task.find();
//     const users = await User.find().select("-password");

//     // ================= STATS =================
//     const totalProjects = projects.length;
//     const totalTasks = tasks.length;

//     const inProgress = tasks.filter(
//       (t) => t.status === "In Progress"
//     ).length;

//     const overdue = tasks.filter(isOverdue).length;

//     // ================= TEAM =================
//     const team = users
//       .filter((u) => u.role === "Member")
//       .map((user) => {
//         const assignedTasks = tasks.filter(
//           (t) => String(t.assigneeId) === String(user._id)
//         );

//         return {
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//           taskCount: assignedTasks.length,
//         };
//       });

//     // ================= RESPONSE =================
//     res.json({
//       stats: {
//         totalProjects,
//         totalTasks,
//         inProgress,
//         overdue,
//       },
//       team,
//     });

//   } catch (error) {
//     console.error("DASHBOARD ERROR:", error);
//     res.status(500).json({ message: "Dashboard failed" });
//   }
// };
import Project from "../models/Project.js";
import Task from "../models/Task.js";
import User from "../models/User.js";

const isOverdue = (task) => {
  if (!task.dueDate) return false;

  return (
    new Date(task.dueDate) <
      new Date() &&
    task.status !== "Done"
  );
};

export const getDashboard =
  async (req, res) => {
    try {
      const projects =
        await Project.find({
          workspaceId:
            req.user.workspaceId,
        });

      const tasks =
        await Task.find({
          workspaceId:
            req.user.workspaceId,
        });

      const users =
        await User.find({
          workspaceId:
            req.user.workspaceId,
        }).select("-password");

      const totalProjects =
        projects.length;

      const totalTasks =
        tasks.length;

      const inProgress =
        tasks.filter(
          (t) =>
            t.status ===
            "In Progress"
        ).length;

      const overdue =
        tasks.filter(
          isOverdue
        ).length;

      const team = users
        .filter(
          (u) =>
            u.role === "Member"
        )
        .map((user) => {
          const assignedTasks =
            tasks.filter(
              (t) =>
                String(
                  t.assigneeId
                ) ===
                String(
                  user._id
                )
            );

          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            taskCount:
              assignedTasks.length,
          };
        });

      res.json({
        stats: {
          totalProjects,
          totalTasks,
          inProgress,
          overdue,
        },

        team,
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Dashboard failed",
      });
    }
  };