import { createSlice } from "@reduxjs/toolkit";

import { submitRecipeThunk } from "./actions";

const addRecipeSlice = createSlice({
  name: "addRecipe",
  initialState: {
    success: false,
  },
  reducers: {
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitRecipeThunk.fulfilled, (state) => {
        state.success = true;
      })
      .addCase(submitRecipeThunk.pending, (state) => {
        state.success = false;
      });
  },
});

export const { clearSuccess } = addRecipeSlice.actions;
export const addRecipeReducer = addRecipeSlice.reducer;
