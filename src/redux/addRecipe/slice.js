import { createSlice } from "@reduxjs/toolkit";

import { fetchRecipeThunk } from "./actions";

const addRecipeSlice = createSlice({
  name: "addRecipe",
  initialState: {
    success: false,
    loading: false,
    error: null,
    recipeId: null,
  },
  reducers: {
    clearSuccess: (state) => {
      state.success = false;
      state.recipeId = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipeThunk.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipeThunk.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.recipeId = action.payload?.id ?? null;
      })
      .addCase(fetchRecipeThunk.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export const { clearSuccess } = addRecipeSlice.actions;
export const { clearError } = addRecipeSlice.actions;
export const addRecipeReducer = addRecipeSlice.reducer;
