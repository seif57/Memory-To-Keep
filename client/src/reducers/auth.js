import { createSlice } from "@reduxjs/toolkit";

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
  extraReducers: {},
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
