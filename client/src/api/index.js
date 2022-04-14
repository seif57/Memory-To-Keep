import axios from "axios";
const API_URL = axios.create({
  baseURL: "http://localhost:5000/",
});

API_URL.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    const token = JSON.parse(localStorage.getItem("profile")).token;
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export const getPosts = () => API_URL.get("/posts");
export const createPost = (newPost) => API_URL.post("/posts", newPost);

export const updatePost = (id, updatedPost) =>
  API_URL.patch(`/posts/${id}`, updatedPost);
export const likePost = (id) => API_URL.patch(`/posts/${id}/likePost`);
export const deletePost = (id) => API_URL.delete(`/posts/${id}`);

export const signIn = (formData) => API_URL.post("/user/signin", formData);
export const signUp = (formData) => API_URL.post("/user/signup", formData);
