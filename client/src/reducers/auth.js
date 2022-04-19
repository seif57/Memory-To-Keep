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
      localStorage.setItem("user", JSON.stringify(state.authData));
    },
    logout: (state) => {
      localStorage.removeItem("user");
      state.loading = false;
      state.error = null;
      state.authData = null;
    },
    setToken: (state, action) => {
      state.loading = false;
      state.error = null;
      state.authData = action.payload;
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
      localStorage.setItem("user", JSON.stringify(state.authData));
    },
    [signIn.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      localStorage.removeItem("user");
    },
    [signUp.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [signUp.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.authData = action.payload;
      localStorage.setItem("user", JSON.stringify(state.authData));
    },
    [signUp.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      localStorage.removeItem("user");
    },
  },
});

export const { googleSignIn, logout, setToken } = authSlice.actions;

export default authSlice.reducer;
