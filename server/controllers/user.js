import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user";

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign({ email: user.email, id: user._id }, "test", {
      expiresIn: "1h",
    });
    return res.status(200).json({
      message: "Sign in successful",
      result: user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Oops! Something went wrong",
    });
  }
};
