
import "dotenv/config";
import cors from "cors";
import express from "express";
import connectDB from "./configs/db.js";
import userRoutes from "./routes/userRoutes.js"
import cookieParser from "cookie-parser";


const app = express();
const PORT =4000;
app.use(express.json());
app.use(cookieParser())
app.use(
  cors({credentials:true})
);
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/auth",userRoutes)

//console.log(process.env.PORT)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
connectDB() 

