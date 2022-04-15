import axios from "axios";
const API_URL = axios.create({
  baseURL: "http://localhost:5000/",
});

export const getPosts = () => API_URL.get("/posts");
export const createPost = (newPost, token) =>
  API_URL.post("/posts", newPost, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updatePost = (id, updatedPost, token) =>
  API_URL.patch(`/posts/${id}`, updatedPost, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const likePost = (id, token) =>
  API_URL.patch(`/posts/${id}/likePost`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const deletePost = (id, token) =>
  API_URL.delete(`/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const signIn = (formData) => API_URL.post("/user/signin", formData);
export const signUp = (formData) => API_URL.post("/user/signup", formData);
