import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  tags: {
    type: Array,
    required: true,
  },
  selectedFile: {
    type: String,
    required: false,
  },
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
