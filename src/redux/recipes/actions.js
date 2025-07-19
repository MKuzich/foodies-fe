import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  addFavoriteRecipeApi,
  getFavoriteRecipesApi,
  getPopularRecipesApi,
  removeFavoriteRecipeApi,
} from "../../api/recipes";

export const fetchPopularRecipes = createAsyncThunk(
  "recipes/fetchPopularRecipes",
  async (excludeId, { rejectWithValue }) => {
    try {
      const recipes = await getPopularRecipesApi(excludeId);
      return recipes;
    } catch (err) {
      return rejectWithValue(err.message || "Unknown error");
    }
  },
);

export const fetchFavoriteRecipes = createAsyncThunk(
  "recipes/fetchFavoriteRecipes",
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    const token = state.auth.userToken;

    if (!token) {
      return [];
    }

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
  async (recipe, { rejectWithValue }) => {
    try {
      const recipes = await addFavoriteRecipeApi(recipe);
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
