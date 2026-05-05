import { userModel } from "../models/userModels.js";
import { userValidaton, userValForLogin } from "../validator/userValidator.js";
import bcrypt from "bcryptjs";
import { genToken } from "../utils/tokenGen.js";

export const about = (req, res) => {
  res.send(`<h1>This is the about page</h1>`);
};

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "please provide your email and password 😞",
      });
    }

    const { error } = userValidaton.validate({
      name,
      email,
      password,
    });

    if (error) {
      return res.status(401).json({
        message: error.details[0].message,
      });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists 😊",
      });
    }

    const newUser = await userModel.create({
      name,
      email,
      password,
    });

    const token = await genToken(newUser._id);

    res.cookie("genToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(201).json({
      message: "User created successfully 🥳",
      data: newUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong 💔",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { error } = userValForLogin.validate({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        message: "User not found 🙂",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials 😞",
      });
    }

    const token = await genToken(existingUser._id);

    res.cookie("genToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(200).json({
      message: "Login successful 😁",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const fetchAllUsers = async (req, res) => {
  try {
    const user = await userModel.find().select("-password");

    return res.status(200).json({
      message: "Users retrieved successfully 📦",
      data: user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getSingle = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: `User not found ❌`,
      });
    }

    return res.status(200).json({
      message: "User retrieved successfully 📦",
      data: user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found ❌",
      });
    }

    return res.status(200).json({
      message: "User deleted successfully ✅",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const logOut = async (req, res) => {
  try {
    res.cookie("genToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(0),
    });

    return res.status(200).json({
      message: "Logged out successfully 👋",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Logout failed",
    });
  }
};