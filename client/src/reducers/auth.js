import { createSlice } from "@reduxjs/toolkit";
import { signIn, signUp } from "../actions/auth";
const initialState = {
  loading: true,
  error: null,
  authData: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    googleSignIn: (state, action) => {
      state.loading = false;
      state.error = null;
      state.authData = action.payload;
    },
    logout: (state) => {
      state.loading = false;
      state.error = null;
      state.authData = null;
    },
  },
  extraReducers: {
    [signIn.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [signIn.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.authData = action.payload;
    },
    [signIn.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [signUp.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [signUp.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.authData = action.payload;
    },
    [signUp.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { googleSignIn, logout } = authSlice.actions;

export default authSlice.reducer;
