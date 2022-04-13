import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ formData, navigate }) => {
    try {
      const { data } = await api.signIn(formData);
      navigate("/");
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ formData, navigate }) => {
    try {
      const { data } = await api.signUp(formData);
      navigate("/");
      return data;
    } catch (error) {
      return error;
    }
  }
);
