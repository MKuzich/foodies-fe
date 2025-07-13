import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRecipesApi } from "../../api/recipes";

export const fetchRecipes = createAsyncThunk(
    'recipes/fetchRecipes',
    async (_, { rejectWithValue }) => {
      try {
        const recipes = await getRecipesApi();
        return recipes;
      } catch (err) {
        return rejectWithValue(err.message || "Unknown error");

      }
    }
  );