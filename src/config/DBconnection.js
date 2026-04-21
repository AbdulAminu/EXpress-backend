import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

let dbConnected = false

export const connectToDb= async()=>{
    if(dbConnected){
         console.log("Database connected successfully")
         return;
    }
    try{
    const db = await mongoose.connect(process.env.MONGODB_URI)
        dbConnected = db.connections[0].readyState
        console.log("Database connected successfully")
    }catch(err){
        if(err instanceof Error){
           console.log(err.message)
           throw new Error(err.message)
        }
        
    }
}