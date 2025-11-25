import express from "express"; 
import userRoutes from "./routes/redeApoioRoutes"; 
const app = express(); 
app.use(express.json()); 
app.use("/api/users", userRoutes); 
export default app;