
import "dotenv/config";
import cors from "cors";
import express from "express";
import connectDB from "./configs/db.js";
import userRoutes from "./routes/userRoutes.js"
import userDataRoutes from "./routes/userDataRoutes.js"
import workspaceRoues from "./routes/workspaceRoutes.js"
import projectRoutes from "./routes/projectRoutes.js"
import cookieParser from "cookie-parser";


const app = express();
const PORT =4000;
const allowedOrigins = [
  'http://localhost:5173',
]
app.use(express.json());
app.use(cookieParser())
app.use(
  cors({origin:allowedOrigins,credentials:true})
);
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/auth",userRoutes)
app.use("/api/user",userDataRoutes)
app.use("/api/workspace",workspaceRoues)
app.use("/api/projects",projectRoutes)

//console.log(process.env.PORT)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
connectDB() 

