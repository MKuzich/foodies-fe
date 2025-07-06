import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api/api";

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (id, thunkAPI) => {
    const url = `/users/${id}`;
    try {
      const { data } = await api.get(url);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
