import express from "express";
import { createWorkspace, getWorkspaces } from "../controllers/workspaceController.js";
import userAuth from "../middlewares/userAuth.js";
const router = express.Router();

router.get("/get-workspaces",userAuth,getWorkspaces)
router.post("/create-workspace",userAuth,createWorkspace)

export default router;