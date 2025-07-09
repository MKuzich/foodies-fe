import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./operations";

const slice = createSlice({
  name: "users",
  initialState: {
    user: null,
    recipes: [],
    favorites: [],
    followers: [],
    following: [],
    isUserIsFollowed: false,
    isUserCurrentUser: false,
  },
  reducers: {
    addToFollowing: (state, action) => {
      state.isUserIsFollowed = true;
    },
    removeFromFollowing: (state, action) => {
      state.isUserIsFollowed = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      state.user = payload;
      // state.isUserCurrentUser = payload.id === state.user.id;
      // state.isUserIsFollowed = payload.followers.includes(state.user.id);
    });
  },
});

export const { addToFollowing, removeFromFollowing } = slice.actions;
export const userReducer = slice.reducer;
