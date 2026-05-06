// // // import mongoose from "mongoose";

// // // const taskSchema = new mongoose.Schema(
// // //   {
// // //     title: { type: String, required: true },
// // //     description: String,

// // //     // ✅ TEMP FIX (use String instead of ObjectId)
// // //     projectId: {
// // //       type: String,
// // //       default: null,
// // //     },

// // //     assigneeId: {
// // //       type: String,
// // //       default: null,
// // //     },

// // //     status: {
// // //       type: String,
// // //       enum: ["Todo", "In Progress", "Done"],
// // //       default: "Todo",
// // //     },

// // //     priority: {
// // //       type: String,
// // //       enum: ["High", "Medium", "Low"],
// // //       default: "Medium",
// // //     },

// // //     dueDate: Date,
// // //   },
// // //   { timestamps: true }
// // // );

// // // export default mongoose.model("Task", taskSchema);
// // import mongoose from "mongoose";

// // const taskSchema = new mongoose.Schema(
// //   {
// //     title: {
// //       type: String,
// //       required: [true, "Title is required"],
// //       trim: true,
// //     },

// //     description: {
// //       type: String,
// //       default: "",
// //     },

// //     projectId: {
// //       type: String,
// //       default: "1", // matches frontend default
// //     },

// //     assigneeId: {
// //       type: String,
// //       default: "unassigned",
// //     },

// //     status: {
// //       type: String,
// //       enum: ["Todo", "In Progress", "Done"],
// //       default: "Todo",
// //     },

// //     priority: {
// //       type: String,
// //       enum: ["High", "Medium", "Low"],
// //       default: "Medium",
// //     },

// //     dueDate: {
// //       type: Date,
// //       default: null,
// //     },
// //   },
// //   {
// //     timestamps: true,
// //   }
// // );

// // export default mongoose.model("Task", taskSchema);
// import mongoose from "mongoose";

// const taskSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, "Title is required"],
//       trim: true,
//     },

//     description: {
//       type: String,
//       default: "",
//     },

//     // project id from project collection
//     projectId: {
//       type: String,
//       required: true,
//     },

//     // assigned member
//     assigneeId: {
//       type: String,
//       default: "unassigned",
//     },
//     workspaceId: {
//   type: String,
//   required: true,
// },

//     // DO NOT ADD OVERDUE HERE
//     // overdue is calculated dynamically
//     status: {
//       type: String,
//       enum: ["Todo", "In Progress", "Done"],
//       default: "Todo",
//     },

//     priority: {
//       type: String,
//       enum: ["High", "Medium", "Low"],
//       default: "Medium",
//     },

//     dueDate: {
//       type: Date,
//       default: null,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model("Task", taskSchema);
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    projectId: {
      type: String,
      required: true,
    },

    assigneeId: {
      type: String,
      default: "unassigned",
    },

    // ✅ NEW
    workspaceId: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Todo", "In Progress", "Done"],
      default: "Todo",
    },

    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },

    dueDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", taskSchema);