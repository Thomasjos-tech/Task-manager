import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    role: {
      type: String,
      enum: ["Admin", "Member"],
      default: "Member",
    },

    avatar: {
      type: String,
      default: "",
    },

    // ✅ VERY IMPORTANT
    workspaceId: {
      type: String,
      required: true,
    },

    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// HASH PASSWORD
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(
    this.password,
    10
  );
});

// MATCH PASSWORD
userSchema.methods.matchPassword =
  async function (enteredPassword) {
    return await bcrypt.compare(
      enteredPassword,
      this.password
    );
  };

// REMOVE PASSWORD
userSchema.methods.toJSON =
  function () {
    const user = this.toObject();

    delete user.password;

    return user;
  };

export default mongoose.model(
  "User",
  userSchema
);