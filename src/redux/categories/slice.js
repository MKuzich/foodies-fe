import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "./actions";



const initialState = {
  categories: [],
  selectedCategory: null,
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchCategories.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchCategories.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export const { setSelectedCategory } = slice.actions;

export const categoriesReducer = slice.reducer;
