import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "@/api/api";

export const fetchRecipeThunk = createAsyncThunk("addRecipe/submit", async (formData, thunkAPI) => {
  try {
    const { data } = await api.post("/recipes", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message || "Unknown error",
    );
  }
});
