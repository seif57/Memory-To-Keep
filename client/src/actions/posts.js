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
    try {
      const { token } = getState().auth.authData;
      const { data } = await api.createPost(newPost, token);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (updatedPost, { getState }) => {
    try {
      const { token } = getState().auth.authData;
      const { _id, ...post } = updatedPost;

      const { data } = await api.updatePost(_id, post, token);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, { getState }) => {
    try {
      const { token } = getState().auth.authData;
      await api.deletePost(id, token);
      return id;
    } catch (error) {
      return error;
    }
  }
);

export const likePost = createAsyncThunk(
  "posts/likePost",
  async (id, { getState }) => {
    try {
      const { token } = getState().auth.authData;
      console.log("token", token);
      console.log(token);
      const { data } = await api.likePost(id, token);
      console.log("data", data);
      return data;
    } catch (error) {
      return error;
    }
  }
);
