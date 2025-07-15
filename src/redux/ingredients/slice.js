import { createSlice } from "@reduxjs/toolkit";

import { _fetchIngredients } from "./actions";

const initialState = {
  ingredients: [],
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(_fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(_fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
      })
      .addCase(_fetchIngredients.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const ingredientsReducer = slice.reducer;
