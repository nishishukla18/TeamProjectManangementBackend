import express from "express";
import { createWorkspace, getUserWorkspaces, getWorkspaceById } from "../controllers/workspaceController.js";
import userAuth from "../middlewares/userAuth.js";
const router = express.Router();

router.get("/get-workspaces",userAuth,getUserWorkspaces)
router.post("/create-workspace",userAuth,createWorkspace)
router.get("/get-workspace/:id",userAuth,getWorkspaceById)

export default router;