import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./operations";
import { userLogout } from "../auth/authActions";

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
  reducers: {
    addToFollowing: (state, action) => {
      state.user.followersCount += 1;
      state.user.isFollowed = true;
    },
    removeFromFollowing: (state, action) => {
      state.user.followersCount -= 1;
      state.user.isFollowed = false;
    },
  },
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
  },
});

export const { addToFollowing, removeFromFollowing } = slice.actions;
export const userReducer = slice.reducer;
