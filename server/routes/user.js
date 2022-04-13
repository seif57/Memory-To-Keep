import express from "express";
import { signIn, signUp } from "../controllers/user.js";

const router = express.Router();

rourter.post("/signin", signIn);
rourter.post("/signup", signUp);
