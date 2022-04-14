import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "../models/user.js";

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

export const signUp = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    if (password !== confirmPassword) {
      return res.status(409).json({
        message: "Passwords does not match",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    return res.status(201).json({
      message: "User created successfully",
      result,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Oops! Something went wrong",
    });
  }
};
