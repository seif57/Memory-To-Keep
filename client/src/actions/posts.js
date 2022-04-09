import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const { data } = await api.getPosts();
  return data;
});

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (newPost) => {
    console.log(newPost);
    const { data } = await api.createPost(newPost);
    return data;
  }
);
