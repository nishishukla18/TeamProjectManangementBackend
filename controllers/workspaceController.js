import Workspace from "../models/workspace.js"
import User from "../models/userModel.js"


export const createWorkspace = async(req,res)=>{
    try {
        const {title,description} = req.body
        const createdByUser = await User.findById(req.user.id);
        const createdBy = createdByUser.name;

        const workspace = await Workspace.create({title,description,createdBy
        })
        res.status(201).json({success:true,message:"workspace created successfully",workspace})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
        
    }
}
export const getWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find(); // no need to populate
    res.status(200).json(workspaces);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch workspaces", error });
  }
};