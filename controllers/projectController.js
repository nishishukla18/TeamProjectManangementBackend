import { Project } from "../models/project.js";

export const createProject = async(req,res)=>{
    try {
       const {title,description,workspaceId,createdBy} = req.body
        const project = new Project({ title, description, workspace: workspaceId, createdBy });
    await project.save();

    res.status(201).json(project);
    } catch (error) {
    res.status(500).json({ message: "Error creating project", error: err.message });
  }
};
export const getProjectsByWorkspace = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const projects = await Project.find({ workspace: workspaceId });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects", error: err.message });
  }
};