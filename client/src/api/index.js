import axios from "axios";
const API_URL = axios.create({
  baseURL: "http://localhost:5000/",
});

// export const authUser = (token) => {
//   API_URL.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// };

API_URL.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getPosts = (page) => API_URL.get(`/posts?page=${page}`);
export const getPostById = (id) => API_URL.get(`/posts/${id}`);

export const getPostsBySearch = (searchQuery) =>
  API_URL.get(`/posts/search?searchQuery=${searchQuery || "none"}`);

export const createPost = (newPost) => API_URL.post("/posts", newPost);

export const updatePost = (id, updatedPost) =>
  API_URL.patch(`/posts/${id}`, updatedPost);
export const likePost = (id) => API_URL.patch(`/posts/${id}/likePost`);
export const deletePost = (id) => API_URL.delete(`/posts/${id}`);

export const signIn = (formData) => API_URL.post("/user/signin", formData);
export const signUp = (formData) => API_URL.post("/user/signup", formData);
