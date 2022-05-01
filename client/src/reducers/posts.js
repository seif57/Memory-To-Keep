import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsBySearch,
  getPostById,
  commentPost,
} from "../actions/posts";
const postsAdapter = createEntityAdapter({
  selectId: (post) => post._id,
});

const initialState = {
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 0,
};

const postsSlice = createSlice({
  name: "posts",
  initialState: postsAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: {
    [getPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      postsAdapter.setAll(state, action.payload.data);
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
    [getPosts.rejected]: (state, action) => {
      state.error = action.error;
    },
    [getPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      postsAdapter.addOne(state, action.payload);
    },
    [createPost.rejected]: (state, action) => {
      state.error = action.error;
    },
    [createPost.pending]: (state) => {
      state.isLoading = true;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      postsAdapter.updateOne(state, {
        id: action.payload._id,
        changes: action.payload,
      });
    },
    [updatePost.rejected]: (state, action) => {
      state.error = action.error;
    },
    [updatePost.pending]: (state) => {
      state.isLoading = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      postsAdapter.removeOne(state, action);
    },
    [likePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      postsAdapter.updateOne(state, {
        id: action.payload._id,
        changes: action.payload,
      });
    },
    [commentPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      postsAdapter.updateOne(state, {
        id: action.payload._id,
        changes: action.payload,
      });
    },
    [commentPost.rejected]: (state, action) => {
      state.error = action.error;
    },

    [getPostsBySearch.fulfilled]: (state, action) => {
      state.isLoading = false;
      postsAdapter.setAll(state, action);
    },
    [getPostsBySearch.rejected]: (state, action) => {
      state.error = action.error;
    },
    [getPostsBySearch.pending]: (state) => {
      state.isLoading = true;
    },
    [getPostById.pending]: (state) => {
      state.isLoading = true;
    },
    [getPostById.fulfilled]: (state, action) => {
      state.isLoading = false;
      postsAdapter.upsertOne(state, action);
    },
    [getPostById.rejected]: (state, action) => {
      state.error = action.error;
    },
  },
});

export const { selectAll: selectAllPosts, selectById: selectByPostId } =
  postsAdapter.getSelectors((state) => state.posts);

export default postsSlice.reducer;
