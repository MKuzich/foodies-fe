import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "./actions";



const initialState = {
  categories: [],
  selectedCategory: null,
  showAll: false,
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
    toggleShowAll: (state) => {
      state.showAll = !state.showAll;
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

export const { setSelectedCategory, toggleShowAll } = slice.actions;

export const categoriesReducer = slice.reducer;
