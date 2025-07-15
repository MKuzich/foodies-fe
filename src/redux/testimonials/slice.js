import { createSlice } from "@reduxjs/toolkit";

import { fetchTestimonials } from "./actions";

const initialState = {
  testimonials: [],
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.testimonials = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const testimonialsReducer = slice.reducer;
