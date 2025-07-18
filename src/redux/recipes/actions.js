import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  addFavoriteRecipeApi,
  getFavoriteRecipesApi,
  getPopularRecipesApi,
  removeFavoriteRecipeApi,
} from "../../api/recipes";

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

export const fetchFavoriteRecipes = createAsyncThunk(
  "recipes/fetchFavoriteRecipes",
  async (_, { rejectWithValue }) => {
    try {
      const recipes = await getFavoriteRecipesApi();
      return recipes;
    } catch (err) {
      return rejectWithValue(err.message || "Unknown error");
    }
  },
);

export const addFavoriteRecipe = createAsyncThunk(
  "recipes/addFavoriteRecipe",
  async (recipeId, { rejectWithValue }) => {
    try {
      const recipes = await addFavoriteRecipeApi(recipeId);
      return recipes;
    } catch (err) {
      return rejectWithValue(err.message || "Unknown error");
    }
  },
);

export const removeFavoriteRecipe = createAsyncThunk(
  "recipes/removeFavoriteRecipe",
  async (recipeId, { rejectWithValue }) => {
    try {
      const recipes = await removeFavoriteRecipeApi(recipeId);
      return recipes;
    } catch (err) {
      return rejectWithValue(err.message || "Unknown error");
    }
  },
);
