import { createSlice } from "@reduxjs/toolkit";

import {
  addFavoriteRecipe,
  fetchFavoriteRecipes,
  fetchPopularRecipes,
  removeFavoriteRecipe,
} from "./actions";

const initialState = {
  popularRecipes: [],
  favoriteRecipes: [],
  showAllRecipes: true,
  wasShowAllRecipesInitialized: false,

  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setShowAllRecipes: (state, action) => {
      state.showAllRecipes = action.payload;
    },
    setWasShowAllRecipesInitialized: (state, action) => {
      state.wasShowAllRecipesInitialized = action.payload;
    },
    setClearFavoriteRecipes: (state) => {
      state.favoriteRecipes = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPopularRecipes.fulfilled, (state, action) => {
        state.popularRecipes = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPopularRecipes.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFavoriteRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFavoriteRecipes.fulfilled, (state, action) => {
        state.favoriteRecipes = action.payload.data;
        state.isLoading = false;
      })
      .addCase(fetchFavoriteRecipes.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(addFavoriteRecipe.pending, (state) => {
        state.error = null;
      })
      .addCase(addFavoriteRecipe.fulfilled, (state, action) => {
        const recipeId = action.payload;
        if (!state.favoriteRecipes.find((fav) => fav.id === recipeId)) {
          state.favoriteRecipes.push(recipeId);
        }
      })
      .addCase(addFavoriteRecipe.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeFavoriteRecipe.pending, (state) => {
        state.error = null;
      })
      .addCase(removeFavoriteRecipe.fulfilled, (state, action) => {
        const recipeId = action.payload;
        state.favoriteRecipes = state.favoriteRecipes.filter((fav) => fav.id !== recipeId);
      })
      .addCase(removeFavoriteRecipe.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  setQuery,
  resetQuery,
  setShowAllRecipes,
  setWasShowAllRecipesInitialized,
  setClearFavoriteRecipes,
} = slice.actions;

export const recipesReducer = slice.reducer;

export { fetchPopularRecipes };
