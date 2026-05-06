// import Project from "../models/Project.js";

// // ================= GET ALL PROJECTS =================
// export const getProjects = async (req, res) => {
//   try {
//     const projects = await Project.find().sort({ createdAt: -1 });
//     res.json(projects);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch projects" });
//   }
// };

// // ================= CREATE PROJECT =================
// export const createProject = async (req, res) => {
//   try {
//     const { name, description, color, ownerId, members } = req.body;

//     if (!name) {
//       return res.status(400).json({ message: "Name required" });
//     }

//     const project = new Project({
//       name,
//       description,
//       color,
//       ownerId,
//       members,
//     });

//     const saved = await project.save();

//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(500).json({ message: "Create failed" });
//   }
// };

// // ================= UPDATE PROJECT =================
// export const updateProject = async (req, res) => {
//   try {
//     const updated = await Project.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: "Update failed" });
//   }
// };

// // ================= DELETE PROJECT =================
// export const deleteProject = async (req, res) => {
//   try {
//     await Project.findByIdAndDelete(req.params.id);
//     res.json({ message: "Deleted" });
//   } catch (err) {
//     res.status(500).json({ message: "Delete failed" });
//   }
// };

// // ================= ADD MEMBER =================
// export const addMember = async (req, res) => {
//   try {
//     const { userId } = req.body;

//     const project = await Project.findById(req.params.id);

//     if (!project.members.includes(userId)) {
//       project.members.push(userId);
//       await project.save();
//     }

//     res.json(project);
//   } catch {
//     res.status(500).json({ message: "Add member failed" });
//   }
// };

// // ================= REMOVE MEMBER =================
// export const removeMember = async (req, res) => {
//   try {
//     const { userId } = req.body;

//     const project = await Project.findById(req.params.id);

//     project.members = project.members.filter((m) => m !== userId);

//     await project.save();

//     res.json(project);
//   } catch {
//     res.status(500).json({ message: "Remove failed" });
//   }
// };
import Project from "../models/Project.js";


// ================= GET PROJECTS =================
export const getProjects = async (
  req,
  res
) => {
  try {
    const projects =
      await Project.find({
        workspaceId:
          req.user.workspaceId,
      }).sort({
        createdAt: -1,
      });

    res.json(projects);

  } catch (err) {
    res.status(500).json({
      message:
        "Failed to fetch projects",
    });
  }
};


// ================= CREATE PROJECT =================
export const createProject = async (
  req,
  res
) => {
  try {
    const {
      name,
      description,
      color,
      ownerId,
      members,
    } = req.body;

    const project = new Project({
      name,
      description,
      color,
      ownerId,
      members,

      workspaceId:
        req.user.workspaceId,
    });

    const saved =
      await project.save();

    res.status(201).json(saved);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Create failed",
    });
  }
};


// ================= UPDATE PROJECT =================
// export const updateProject = async (
//   req,
//   res
// ) => {
//   try {
//     const updated =
//       await Project.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         {
//           new: true,
//         }
//       );

//     res.json(updated);

//   } catch (err) {
//     res.status(500).json({
//       message: "Update failed",
//     });
//   }
// };
export const updateProject = async (
  req,
  res
) => {
  try {
    const project =
      await Project.findById(
        req.params.id
      );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // =========================
    // ADD MEMBER
    // =========================

    if (req.body.addMember) {

      const memberId =
        req.body.addMember;

      if (
        !project.members.includes(
          memberId
        )
      ) {
        project.members.push(
          memberId
        );
      }
    }

    // =========================
    // NORMAL UPDATE
    // =========================

    if (req.body.name !== undefined) {
      project.name = req.body.name;
    }

    if (
      req.body.description !==
      undefined
    ) {
      project.description =
        req.body.description;
    }

    if (req.body.members) {
      project.members =
        req.body.members;
    }

    await project.save();

    res.json(project);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Update failed",
    });
  }
};


// ================= DELETE PROJECT =================
export const deleteProject = async (
  req,
  res
) => {
  try {
    await Project.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Deleted",
    });

  } catch (err) {
    res.status(500).json({
      message: "Delete failed",
    });
  }
};


// ================= ADD MEMBER =================
export const addMember = async (
  req,
  res
) => {
  try {
    const { userId } = req.body;

    const project =
      await Project.findById(
        req.params.id
      );

    if (
      !project.members.includes(
        userId
      )
    ) {
      project.members.push(userId);

      await project.save();
    }

    res.json(project);

  } catch {
    res.status(500).json({
      message:
        "Add member failed",
    });
  }
};


// ================= REMOVE MEMBER =================
export const removeMember = async (
  req,
  res
) => {
  try {
    const { userId } = req.body;

    const project =
      await Project.findById(
        req.params.id
      );

    project.members =
      project.members.filter(
        (m) => m !== userId
      );

    await project.save();

    res.json(project);

  } catch {
    res.status(500).json({
      message:
        "Remove failed",
    });
  }
};