import { createSlice } from "@reduxjs/toolkit";
import { fetchRecipes } from "./actions";



const initialState = {
  recipes: [],
  isLoading: false,
  error: null,
  page: 1,
  limit: 10,
};

const slice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchRecipes.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchRecipes.fulfilled, (state, action) => {
      state.recipes = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchRecipes.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});


export const recipesReducer = slice.reducer;
