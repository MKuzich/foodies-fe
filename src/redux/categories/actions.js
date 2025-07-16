import { createAsyncThunk } from "@reduxjs/toolkit";

import { getCategoriesApi } from "../../api/categories";

export const _fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const categories = await getCategoriesApi();
      return categories;
    } catch (err) {
      return rejectWithValue(err.message || "Unknown error");
    }
  },
);
