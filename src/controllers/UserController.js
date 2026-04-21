import { userModel } from "../models/userModels.js";
import { userValidaton, userValForLogin } from "../validator/userValidator.js";
import bcrypt from "bcryptjs";
import { genToken } from "../utils/tokenGen.js";
export const signUp= async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (email != "" && password != "") {
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
          message:
            "User already exist, please go ahead and login with your details or create a new account 😊",
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
        secure: process.env.NODE_ENV === "production",
        strict: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
      return res.status(201).json({
        message: "user created successfully 🥳",
        data: newUser,
      });
    } else {
      return res.status(401).json({
        message: "please provide your email and your password 😞",
      });
    }
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
        message: `user with email ${email} doesn't exist, please sign up 🙂`,
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials 😞",
      });
    }
    const token = await genToken(existingUser._id);
    res.cookie("genToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return res.status(200).json({
      message: "Login sucessfull, welcome back 😁",
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchAllUsers = async (req, res) => {
  try {
    const user = await userModel.find().select("-password");
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    res.status(200).json({
      message: "user retrieved successfully",
      data: user,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      throw new Error(err.message);
    }
  }
};

export const getSingle = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: `User with id: ${id} doesn't exist`,
      });
    }
    res.status(200).json({
      message: "User retrieved succesfully",
      data: user,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      throw new Error(err.message);
    }
  }
};
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findOneAndDelete(id);
    if(!user){
      res.status(404).json({
        message:`User with id: ${id} not found`
      })
    }
    res.status(200).json({
      message:"User deleted successdully"
    })
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      throw new Error(err.message);
    }
  }
};
export const logOut = async (req, res)=>{
 try{
   res.clearCookie("genToken", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
       })

       return res.status(200).json({
          message: "Account logout successful"
       })
 }catch(err){
  console.error(err)
 }
}