import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import User from "../models/userModels.js";

const secret = process.env.JWT_SECRET;

export const checkToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No access token found",
      });
    }

    const token = authHeader.split(" ")[1];  // extract the actual token

    const decoded = jwt.verify(token, secret);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }

    req.user = user;
    next();

  } catch (err) {
    console.error(err);
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
export default checkToken;