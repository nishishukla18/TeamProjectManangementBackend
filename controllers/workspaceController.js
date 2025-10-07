import Workspace from "../models/workspace.js"
import userModel from "../models/userModel.js"
import Project  from "../models/project.js";


// ✅ Create a new workspace
export const createWorkspace = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id; // coming from your auth middleware

    const workspace = await Workspace.create({
      title,
      description,
      createdBy: userId,
      members: [userId], // creator is automatically a member
    });

    res.json({
      success: true,
      message: "Workspace created successfully",
      workspace,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all workspaces for a user
export const getUserWorkspaces = async (req, res) => {
  try {
    const userId = req.user.id;
    const workspaces = await Workspace.find({ members: userId }).populate("projects");
    res.json({ success: true, workspaces });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get single workspace details
export const getWorkspaceById = async (req, res) => {
  try {
    const { id } = req.params;
    const workspace = await Workspace.findById(id)
      .populate("projects")
      .populate("members", "name email");

    if (!workspace) return res.status(404).json({ success: false, message: "Workspace not found" });

    res.json({ success: true, workspace });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};