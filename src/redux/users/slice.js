import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./operations";

const slice = createSlice({
  name: "users",
  initialState: {
    user: null,
    isUserIsFollowed: false,
    isUserCurrentUser: false,
    scrollIsScrolling: false,
  },
  reducers: {
    addToFollowing: (state, action) => {
      state.isUserIsFollowed = true;
    },
    removeFromFollowing: (state, action) => {
      state.isUserIsFollowed = false;
    },
    toggleScrolling: (state, action) => {
      state.scrollIsScrolling = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
  },
});

export const { addToFollowing, removeFromFollowing, toggleScrolling } =
  slice.actions;
export const userReducer = slice.reducer;
