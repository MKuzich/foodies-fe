import { createSlice } from "@reduxjs/toolkit";

import { _fetchCategories } from "./actions";

const initialState = {
  categories: [],
  showAll: false,
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    toggleShowAll: (state) => {
      state.showAll = !state.showAll;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(_fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(_fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoading = false;
      })
      .addCase(_fetchCategories.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { toggleShowAll } = slice.actions;

export const categoriesReducer = slice.reducer;
