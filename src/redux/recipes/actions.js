import { createAsyncThunk } from "@reduxjs/toolkit";

import { getRecipesApi } from "../../api/recipes";

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async ({ category, page, ingredient, area, limit }, { rejectWithValue }) => {
    try {
      const recipes = await getRecipesApi(category, page, ingredient, area, limit);
      return recipes;
    } catch (err) {
      return rejectWithValue(err.message || "Unknown error");
    }
  },
);
