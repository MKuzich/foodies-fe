import { createSlice } from "@reduxjs/toolkit";

import { fetchPopularRecipes, fetchRecipes } from "./actions";

const initialState = {
  recipes: [],
  popularRecipes: [],
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
      state.query[action.payload.key] = action.payload.value;
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
      });
  },
});

export const { setQuery, resetQuery, setShowAllRecipes, setWasShowAllRecipesInitialized } = slice.actions;

export const recipesReducer = slice.reducer;

export { fetchPopularRecipes };
