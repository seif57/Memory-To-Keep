import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { getPosts, createPost, updatePost } from "../actions/posts";
const postsAdapter = createEntityAdapter({
  selectId: (post) => post._id,
});

const postsSlice = createSlice({
  name: "posts",
  initialState: postsAdapter.getInitialState({ loading: false, error: null }),
  reducers: {},
  extraReducers: {
    [getPosts.fulfilled]: (state, action) => {
      state.loading = false;
      postsAdapter.setAll(state, action);
    },
    [getPosts.rejected]: (state, action) => {
      state.error = action.error;
    },
    [getPosts.pending]: (state) => {
      state.loading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      postsAdapter.addOne(state, action.payload);
    },
    [createPost.rejected]: (state, action) => {
      state.error = action.error;
    },
    [createPost.pending]: (state) => {
      state.loading = true;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.loading = false;
      postsAdapter.updateOne(state, {
        id: action.payload._id,
        changes: action.payload,
      });
    },
    [updatePost.rejected]: (state, action) => {
      state.error = action.error;
    },
    [updatePost.pending]: (state) => {
      state.loading = true;
    },
  },
});

export const { selectAll: selectAllPosts, selectById: selectByPostId } =
  postsAdapter.getSelectors((state) => state.posts);

export default postsSlice.reducer;
