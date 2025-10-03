import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { 
    type: String, 
    enum: ["Not Started", "In Progress", "Completed"], 
    default: "Not Started" 
  },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  workspace: { type: mongoose.Schema.Types.ObjectId, ref: "Workspace", required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Project = mongoose.model("Project", projectSchema);
