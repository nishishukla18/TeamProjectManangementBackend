import Project from "../models/project.js";
import Workspace from "../models/workspace.js";
import transporter  from "../configs/nodemailer.js";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Create a new project under a workspace
export const createProject = async (req, res) => {
  try {
    const { title, description, workspaceId } = req.body;
    const userId = req.user.id;

    // Verify workspace exists
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace)
      return res.status(404).json({ success: false, message: "Workspace not found" });

    // Create project
    const project = await Project.create({
      title,
      description,
      workspace: workspaceId,
      createdBy: userId,
      members: [userId],
    });

    // Add project to workspace
    workspace.projects.push(project._id);
    await workspace.save();

    res.json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Join a project using invite link
export const joinProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });

    if (project.members.includes(userId)) {
      return res.json({ success: false, message: "Already joined this project" });
    }

    project.members.push(userId);
    await project.save();

    res.json({ success: true, message: "Joined project successfully", project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// ✅ Get all projects for a workspace
export const getWorkspaceProjects = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const projects = await Project.find({ workspace: workspaceId }).populate("members", "name email");

    res.json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const sendProjectInvite = async (req, res) => {
  try {
    const { email, projectId } = req.body;
    const senderId = req.user.id;

    // Check project existence
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    // Generate invite token (valid for 24 hours)
    const token = jwt.sign(
      { projectId, email },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    console.log("Decoded Invite Token:", token);
    // Frontend join link
    const inviteLink = `${process.env.FRONTEND_URL}/join-project/${token}`;

    // Send email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: `Invitation to join project: ${project.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.5">
          <h2>You’ve been invited to join <b>${project.title}</b></h2>
          <p>The project owner has invited you to collaborate on this project.</p>
          <a href="${inviteLink}" 
             style="display:inline-block;background:#4f46e5;color:#fff;padding:10px 16px;
                    text-decoration:none;border-radius:6px;margin-top:10px;">
             Join Project
          </a>
          <p>If you’re not registered, you’ll be redirected to the login page.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Invitation email sent successfully!" });
  } catch (error) {
    console.error("Error sending invite:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyProjectInvite = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const { email, projectId } = decoded;
    

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, registered: false, redirect: "/login" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    return res.json({
      success: true,
      registered: true,
      redirect: `/hub/workspace/${project.workspace}/project/${projectId}`,
    });
    console.log("Generated Invite Token:", token);
  } catch (error) {
    return res.status(400).json({ success: false, message: "Invalid or expired token" });
  }
};
