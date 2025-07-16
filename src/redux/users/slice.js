import { createSlice } from "@reduxjs/toolkit";

import { userLogout } from "../auth/actions";
import {
  changeAvatar,
  fetchUser,
  fetchUserFavorites,
  fetchUserFollowers,
  fetchUserFollowing,
  fetchUserRecipes,
  followUser,
  removeFromFavoriteRecipe,
  removeRecipe,
  unfollowUser,
} from "./operations";

const userSchema = {
  id: "",
  name: "",
  email: "",
  avatarURL: null,
  createdCount: 0,
  favoriteCount: 0,
  followersCount: 0,
  followingCount: 0,
  isFollowed: false,
  recipes: [],
  favorites: [],
  followers: [],
  following: [],
  followLoading: false,
  recipesLoading: false,
};

const slice = createSlice({
  name: "users",
  initialState: {
    user: userSchema,
    filter: {
      page: 1,
      limit: 9,
    },
    tab: "recipes",
    totalPages: 0,
  },
  reducers: {
    changePage: (state, { payload }) => {
      state.filter.page = payload;
    },
    changeTab: (state, { payload }) => {
      state.tab = payload;
      state.filter.page = 1;
      state.totalPages = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.user = userSchema;
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.user = { ...state.user, ...payload };
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.user = userSchema;
      })
      .addCase(changeAvatar.fulfilled, (state, { payload }) => {
        state.user.avatarURL = payload.avatarURL;
      })
      .addCase(fetchUserRecipes.pending, (state) => {
        state.recipesLoading = true;
      })
      .addCase(fetchUserRecipes.fulfilled, (state, { payload }) => {
        state.totalPages = payload.pagination.pages;
        state.user.recipes = payload.data;
        state.recipesLoading = false;
      })
      .addCase(fetchUserRecipes.rejected, (state) => {
        state.recipesLoading = false;
      })
      .addCase(fetchUserFavorites.pending, (state) => {
        state.recipesLoading = true;
      })
      .addCase(fetchUserFavorites.fulfilled, (state, { payload }) => {
        state.totalPages = payload.pagination.pages;
        state.user.favorites = payload.data;
        state.recipesLoading = false;
      })
      .addCase(fetchUserFavorites.rejected, (state) => {
        state.recipesLoading = false;
      })
      .addCase(removeFromFavoriteRecipe.pending, (state) => {
        state.recipesLoading = true;
      })
      .addCase(removeFromFavoriteRecipe.fulfilled, (state, { payload }) => {
        state.recipesLoading = false;
        state.user.favorites = payload.data;
        state.user.favoriteCount = payload.pagination.total;
        state.totalPages = payload.pagination.pages;
      })
      .addCase(fetchUserFollowers.fulfilled, (state, { payload }) => {
        state.totalPages = payload.pagination.pages;
        state.user.followers = payload.results;
      })
      .addCase(fetchUserFollowing.fulfilled, (state, { payload }) => {
        state.totalPages = payload.pagination.pages;
        state.user.following = payload.results;
      })
      .addCase(unfollowUser.pending, (state) => {
        state.followLoading = true;
      })
      .addCase(unfollowUser.fulfilled, (state, { payload }) => {
        const { id, data, currentUserInfo } = payload;
        // we can unfollow user in two cases:
        // 1. when we unfollow user from user page profile
        // 2. when we unfollow user from own page following, so we change followingCount

        // case 1
        const parsedId = parseInt(id);
        if (state.user.id === parsedId) {
          state.user.followersCount -= 1;
          state.user.isFollowed = false;
          state.user.followers = [];
        }

        // case 2
        if (state.user.id === currentUserInfo.id) {
          state.user.followingCount -= 1;
          state.user.following = [];
          state.user.followers = data.userFollowers.results;
          // state.user.following = state.user.following.filter((following) => following.id !== id);
        }
        state.followLoading = false;
      })
      .addCase(unfollowUser.rejected, (state) => {
        state.followLoading = false;
      })
      .addCase(followUser.pending, (state) => {
        state.followLoading = true;
      })
      .addCase(followUser.fulfilled, (state, { payload }) => {
        const { id, data, currentUserInfo } = payload;
        const parsedId = parseInt(id);

        // case 1
        if (state.user.id === parsedId) {
          state.user.followersCount += 1;
          state.user.isFollowed = true;
          state.user.followers = data.followers.results;
        }

        // case 2
        if (state.user.id === currentUserInfo.id) {
          state.user.followingCount += 1;
          state.user.followers = data.userFollowers.results;
        }
        state.totalPages = data.followers.pagination.pages;
        state.filter.page = 1;
        state.followLoading = false;
      })
      .addCase(followUser.rejected, (state) => {
        state.followLoading = false;
      })
      .addCase(removeRecipe.fulfilled, (state, { payload }) => {
        state.user.recipes = payload.data;
        state.user.createdCount = payload.pagination.total;
        state.totalPages = payload.pagination.pages;
        state.filter.page = 1;
      });
  },
});

export const { changePage, changeTab } = slice.actions;
export const userReducer = slice.reducer;
