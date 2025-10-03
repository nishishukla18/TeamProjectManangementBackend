import { Project } from "../models/project.js";

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { title, description, status, startDate, endDate, workspaceId, createdBy } = req.body;

    const project = new Project({
      title,
      description,
      status: status || "Not Started",
      startDate: startDate || Date.now(),
      endDate,
      workspace: workspaceId,
      createdBy,
    });

   const savedProject = await project.save();

return res.status(201).json({
  success: true,
  message: "Project created successfully",
  project: savedProject,
});
  } catch (err) {
    res.status(500).json({ message: "Error creating project", error: err.message });
  }
};

// Get all projects of a workspace
export const getProjectsByWorkspace = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const projects = await Project.find({ workspace: workspaceId });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects", error: err.message });
  }
};
