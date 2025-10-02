import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    createdBy: { type: String, required: true },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

const Workspace = mongoose.model("Workspace", workspaceSchema);
export default Workspace;
