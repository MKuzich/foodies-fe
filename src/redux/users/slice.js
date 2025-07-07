import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./operations";

const slice = createSlice({
  name: "users",
  initialState: {
    user: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
  },
});
export const userReducer = slice.reducer;
