import express from "express";
import {
  createProject,
  getWorkspaceProjects,
  joinProject,
  sendProjectInvite,
  verifyProjectInvite,
} from "../controllers/projectController.js";
import userAuth from "../middlewares/userAuth.js";

const router = express.Router();

router.post("/create-project", userAuth, createProject);
router.get("/get-projects/workspace/:workspaceId", userAuth, getWorkspaceProjects);
router.post("/join-project/:projectId", userAuth, joinProject);
router.post("/send-invite", userAuth, sendProjectInvite); // ✅ add this new route
router.get("/verify-invite/:token",verifyProjectInvite)

export default router;
