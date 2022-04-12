import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    authData: null,
  },
  reducers: {
    login: (state, action) => {
      state.loading = true;
      state.error = null;
      state.authData = action.payload;
    },
  },
  extraReducers: {},
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
