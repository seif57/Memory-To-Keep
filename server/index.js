import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postsRouter from "./routes/posts.js";

const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use("/posts", postsRouter);

// connect to mongodb

// const CONNECTION_URL =
//   "mongodb+srv://seif_sallam:Seif2012@cluster0.tyb6i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const Port = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(Port, () => {
      console.log(`Server is running on port ${Port}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
