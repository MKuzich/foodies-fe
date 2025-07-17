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
  userLoading: false,
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
      if (payload === "recipes" || payload === "favorites") {
        state.recipesLoading = true;
      }
      if (payload === "followers" || payload === "following") {
        state.followLoading = true;
      }
      state.filter.page = 1;
      state.totalPages = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.user = userSchema;
        state.userLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.user = { ...state.user, ...payload };
        state.userLoading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.userLoading = false;
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
      .addCase(fetchUserFollowers.pending, (state) => {
        state.followLoading = true;
      })
      .addCase(fetchUserFollowers.fulfilled, (state, { payload }) => {
        state.totalPages = payload.pagination.pages;
        state.user.followers = payload.results;
        state.followLoading = false;
      })
      .addCase(fetchUserFollowers.rejected, (state) => {
        state.followLoading = false;
      })
      .addCase(fetchUserFollowing.pending, (state) => {
        state.followLoading = true;
      })
      .addCase(fetchUserFollowing.fulfilled, (state, { payload }) => {
        state.totalPages = payload.pagination.pages;
        state.user.following = payload.results;
        state.followLoading = false;
      })
      .addCase(fetchUserFollowing.rejected, (state) => {
        state.followLoading = false;
      })
      .addCase(unfollowUser.pending, (state) => {
        if (state.tab === "followers" || state.tab === "following") {
          state.followLoading = true;
        }
      })
      .addCase(unfollowUser.fulfilled, (state, { payload }) => {
        const { id, data, currentUserId } = payload;
        // id - is user id we unfollow
        // currentUserInfo - is current loggined user info
        // data - is data we get from callback (getUserFollowers or getUserFollowing)

        // work with other user profiles
        // if we unfollow user from user page profile button without using tabs
        if (state.user.id === parseInt(id)) {
          // current open user page profile is the id we unfollow
          state.user.followersCount -= 1;
          state.user.isFollowed = false;
          if (state.tab === "followers") {
            state.user.followers = data.results;
          }
        } else {
          if (state.tab === "followers") {
            if (state.user.id === parseInt(currentUserId)) {
              // decrement only if it own profile
              state.user.followingCount -= 1;
            }
            state.user.followers = data.results;
          }

          if (state.tab === "following") {
            state.user.followingCount -= 1;
            state.user.following = data.results;
          }
        }

        state.followLoading = false;
        state.filter.page = 1;
      })
      .addCase(unfollowUser.rejected, (state) => {
        state.followLoading = false;
      })
      .addCase(followUser.pending, (state) => {
        if (state.tab === "followers" || state.tab === "following") {
          state.followLoading = true;
        }
      })
      .addCase(followUser.fulfilled, (state, { payload }) => {
        const { id, data, currentUserId } = payload;

        // id - is user id we follow
        // currentUserId - is current loggined user id
        // data - is data we get from callback (getUserFollowers or getUserFollowing)

        if (state.user.id === parseInt(id)) {
          // current open user page profile is the id we follow
          state.user.followersCount += 1;
          state.user.isFollowed = true;
          if (state.tab === "followers") {
            state.user.followers = data.results;
          }
        } else {
          if (state.tab === "followers") {
            if (state.user.id === parseInt(currentUserId)) {
              // increment only if it own profile
              state.user.followingCount += 1;
            }
            state.user.followers = data.results;
          }
        }

        state.filter.page = 1;
        state.followLoading = false;
      })
      .addCase(followUser.rejected, (state) => {
        state.followLoading = false;
      })
      .addCase(removeRecipe.pending, (state) => {
        state.recipesLoading = true;
      })
      .addCase(removeRecipe.fulfilled, (state, { payload }) => {
        state.user.recipes = payload.data;
        state.user.createdCount = payload.pagination.total;
        state.totalPages = payload.pagination.pages;
        state.filter.page = 1;
        state.recipesLoading = false;
      })
      .addCase(removeRecipe.rejected, (state) => {
        state.recipesLoading = false;
      });
  },
});

export const { changePage, changeTab } = slice.actions;
export const userReducer = slice.reducer;
