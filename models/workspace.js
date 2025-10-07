import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },

    // Reference to the creator (no changes to user model)
    createdBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "user", 
      required: true 
    },

    // Members of this workspace
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],

    // Projects under this workspace
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
  },
  { timestamps: true }
);

const Workspace = mongoose.model("Workspace", workspaceSchema);
export default Workspace;
