import { createSlice } from "@reduxjs/toolkit";

import { userLogout } from "../auth/authActions";
import { changeAvatar, fetchUser, followUser, unfollowUser } from "./operations";

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
};

const slice = createSlice({
  name: "users",
  initialState: {
    user: userSchema,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.user = userSchema;
    });
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      state.user = { ...state.user, ...payload };
    });
    builder.addCase(userLogout.fulfilled, (state) => {
      state.user = userSchema;
    });
    builder.addCase(followUser.fulfilled, (state) => {
      state.user.followersCount += 1;
      state.user.isFollowed = true;
    });
    builder.addCase(unfollowUser.fulfilled, (state) => {
      state.user.followersCount -= 1;
      state.user.isFollowed = false;
    });
    builder.addCase(changeAvatar.fulfilled, (state, { payload }) => {
      state.user.avatarURL = payload.avatarURL;
    });
  },
});

export const userReducer = slice.reducer;
