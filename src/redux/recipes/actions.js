import { createAsyncThunk } from "@reduxjs/toolkit";

import { getPopularRecipesApi, getRecipesApi } from "../../api/recipes";

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

export const fetchPopularRecipes = createAsyncThunk(
  "recipes/fetchPopularRecipes",
  async (_, { rejectWithValue }) => {
    try {
      const recipes = await getPopularRecipesApi();
      return recipes;
    } catch (err) {
      return rejectWithValue(err.message || "Unknown error");
    }
  },
);
