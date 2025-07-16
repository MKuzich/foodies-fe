import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../api/api";
import {
  followUserById,
  getUser,
  getUserFavorites,
  getUserFollowers,
  getUserFollowing,
  getUserRecipes,
  unfollowUserById,
} from "../../api/users";

export const fetchUser = createAsyncThunk("users/fetchUser", async (id, thunkAPI) => {
  try {
    return await getUser(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchUserRecipes = createAsyncThunk(
  "users/fetchUserRecipes",
  async ({ id, page, limit }, thunkAPI) => {
    try {
      return await getUserRecipes({ id, page, limit });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const fetchUserFavorites = createAsyncThunk(
  "users/fetchUserFavorites",
  async ({ page, limit }, thunkAPI) => {
    try {
      return await getUserFavorites({ page, limit });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const removeFromFavoriteRecipe = createAsyncThunk(
  "users/removeFromFavoriteRecipe",
  async (id, thunkAPI) => {
    const url = `/recipes/${id}/favorite`;
    const state = thunkAPI.getState();
    try {
      await api.delete(url);
      return await getUserFavorites({ page: 1, limit: state.users.filter.limit });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const fetchUserFollowers = createAsyncThunk(
  "users/fetchUserFollowers",
  async ({ id, page, limit }, thunkAPI) => {
    try {
      return await getUserFollowers({ id, page, limit });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const fetchUserFollowing = createAsyncThunk(
  "users/fetchUserFollowing",
  async (_, thunkAPI) => {
    try {
      return await getUserFollowing();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const followUser = createAsyncThunk("users/followUserById", async (id, thunkAPI) => {
  const state = thunkAPI.getState();
  const currentUserInfo = state.auth.userInfo;
  try {
    return {
      id,
      data: await followUserById({ id, userId: currentUserInfo.id }),
      currentUserInfo,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const unfollowUser = createAsyncThunk("users/unfollowUser", async (id, thunkAPI) => {
  const state = thunkAPI.getState();
  const currentUserInfo = state.auth.userInfo;

  try {
    return {
      id,
      data: await unfollowUserById({ id, userId: currentUserInfo.id }),
      currentUserInfo,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const changeAvatar = createAsyncThunk(
  "users/changeAvatar",
  async (newAvatarFile, thunkAPI) => {
    const url = "auth/avatars";
    try {
      const formData = new FormData();
      formData.append("avatar", newAvatarFile, newAvatarFile.name);
      const { data } = await api.patch(url, formData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const removeRecipe = createAsyncThunk("users/removeRecipe", async (id, thunkAPI) => {
  const url = `/recipes/${id}`;
  const state = thunkAPI.getState();
  try {
    await api.delete(url);
    const { data } = await api.get(
      `/users/${state.users.user.id}/recipes?page=1&limit=${state.users.filter.limit}`,
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
