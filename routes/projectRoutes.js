import express from "express";
import { createProject, getProjectsByWorkspace } from "../controllers/projectController.js";
import userAuth from "../middlewares/userAuth.js";

const router = express.Router();

router.post("/create-project",userAuth, createProject)
router.get("/get-projects/:workspaceId",userAuth, getProjectsByWorkspace)
export default router;