import express from "express";
import Routing from "./Routes/userRoutes.js";
import taskRoutes from "./Routes/taskRoutes.js";
import { connectToDb } from "./config/DBconnection.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://task-cortex.vercel.app"],
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/users", Routing);
app.use("/tasks", taskRoutes);

// DB connection
connectToDb()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("DB connection failed:", err);
    process.exit(1);
  });

// server
if (process.env.NODE_ENV !== "production") {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

export default app;