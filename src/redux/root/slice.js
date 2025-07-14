import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "root",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {
    setActiveLoading: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    setInactiveLoading: (state) => {
      return {
        ...state,
        loading: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, { error, payload }) => {
          state.error = payload.message ? payload.message : error;
          state.loading = false;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
        },
      );
  },
});

export const { setActiveLoading, setInactiveLoading } = slice.actions;
export const rootReducer = slice.reducer;
