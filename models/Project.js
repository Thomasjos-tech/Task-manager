// import mongoose from "mongoose";

// const projectSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     description: String,

//     color: {
//       type: String,
//       default: "248 80% 60%",
//     },

//     ownerId: {
//       type: String,
//       required: true,
//     },

//     members: {
//       type: [String], // user IDs
//       default: [],
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Project", projectSchema);
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: String,

    color: {
      type: String,
      default: "248 80% 60%",
    },

    ownerId: {
      type: String,
      required: true,
    },

    workspaceId: {
      type: String,
      required: true,
    },

    members: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "Project",
  projectSchema
);