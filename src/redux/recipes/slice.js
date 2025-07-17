import { createSlice } from "@reduxjs/toolkit";

import { addFavoriteRecipe, fetchFavoriteRecipes, fetchPopularRecipes, fetchRecipes, removeFavoriteRecipe } from "./actions";

const initialState = {
  recipes: [],
  popularRecipes: [],
  favoriteRecipes: [],
  showAllRecipes: true,
  wasShowAllRecipesInitialized: false,
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    pages: null,
  },
  query: {},
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    resetQuery: (state) => {
      state.query = {};
    },
    setShowAllRecipes: (state, action) => {
      state.showAllRecipes = action.payload;
    },
    setWasShowAllRecipesInitialized: (state, action) => {
      state.wasShowAllRecipesInitialized = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.recipes = action.payload.data;
        state.pagination = action.payload.pagination;
        state.isLoading = false;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
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
        const recipe = state.recipes.find(recipe => recipe.id === recipeId);
        
        if (recipe && !state.favoriteRecipes.find(fav => fav.id === recipeId)) {
            state.favoriteRecipes.push({ ...recipe });
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
        state.favoriteRecipes = state.favoriteRecipes.filter(fav => fav.id !== recipeId);
      })
      .addCase(removeFavoriteRecipe.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setQuery, resetQuery, setShowAllRecipes, setWasShowAllRecipesInitialized } = slice.actions;

export const recipesReducer = slice.reducer;

export { fetchPopularRecipes };
