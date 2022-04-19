import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ formData, navigate }, { rejectWithValue }) => {
    try {
      const { data } = await api.signIn(formData);
      navigate("/");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ formData, navigate }, { rejectWithValue }) => {
    try {
      const { data } = await api.signUp(formData);
      navigate("/");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
