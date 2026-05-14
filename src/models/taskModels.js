import { required, string } from "joi";
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    task:{
        type: string,
        required:true
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
}, {timestamps:true})
const Task = mongoose.model("Task", taskSchema);

export default Task;