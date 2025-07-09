import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUser,
  fetchUserFollowers,
  fetchUserFollowing,
  fetchUserFavorites,
  fetchUserRecipes,
} from "./operations";

const slice = createSlice({
  name: "users",
  initialState: {
    user: null,
    recipes: null,
    favorites: null,
    followers: null,
    following: null,
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
    });
    builder.addCase(fetchUserRecipes.fulfilled, (state, { payload }) => {
      state.recipes = payload;
    });
    builder.addCase(fetchUserFavorites.fulfilled, (state, { payload }) => {
      state.favorites = payload;
    });
    builder.addCase(fetchUserFollowers.fulfilled, (state, { payload }) => {
      state.followers = payload;
    });
    builder.addCase(fetchUserFollowing.fulfilled, (state, { payload }) => {
      state.following = payload;
    });
  },
});

export const { addToFollowing, removeFromFollowing } = slice.actions;
export const userReducer = slice.reducer;
