import express from "express";
import Routing from "./Routes/userRoutes.js";
import { connectToDb } from "./config/DBconnection.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import cookieParser from 'cookie-parser'
import cors from "cors"

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
await connectToDb();

app.use(Routing);

app.listen(3000, () => {
  console.log("server running at port 3000");
});
