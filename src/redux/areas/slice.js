import { createSlice } from "@reduxjs/toolkit";

import { _fetchAreas } from "./actions";

const initialState = {
  areas: [],
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "areas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(_fetchAreas.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(_fetchAreas.fulfilled, (state, action) => {
        state.areas = action.payload;
        state.isLoading = false;
      })
      .addCase(_fetchAreas.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const areasReducer = slice.reducer;
