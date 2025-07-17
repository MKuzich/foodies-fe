import { createAsyncThunk } from "@reduxjs/toolkit";

import { getPopularRecipesApi, getRecipesApi, getFavoriteRecipesApi, addFavoriteRecipeApi, removeFavoriteRecipeApi } from "../../api/recipes";

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async ({ category, page, ingredient, area, limit }, { rejectWithValue }) => {
    try {
      console.log("fetching recipes", category, page, ingredient, area, limit);
      const recipes = await getRecipesApi(category, page, ingredient, area, limit);
      console.log("recipes", recipes);
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
