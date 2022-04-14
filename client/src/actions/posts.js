import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  try {
    const { data } = await api.getPosts();
    return data;
  } catch (error) {
    return error;
  }
});

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (newPost, { getState }) => {
    const token = getState().auth.authData.token;
    try {
      const { data } = await api.createPost(newPost, token);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (updatedPost) => {
    try {
      const { _id, ...post } = updatedPost;

      const { data } = await api.updatePost(_id, post);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  try {
    await api.deletePost(id);
    return id;
  } catch (error) {
    return error;
  }
});

export const likePost = createAsyncThunk("posts/likePost", async (id) => {
  try {
    const { data } = await api.likePost(id);
    return data;
  } catch (error) {
    return error;
  }
});
