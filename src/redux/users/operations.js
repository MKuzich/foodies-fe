import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../api/api";

export const fetchUser = createAsyncThunk("users/fetchUser", async (id, thunkAPI) => {
  const url = `/users/${id}`;
  try {
    const { data } = await api.get(url);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchUserRecipes = createAsyncThunk(
  "users/fetchUserRecipes",
  async ({ id, page, limit }, thunkAPI) => {
    const url = `/users/${id}/recipes?page=${page}&limit=${limit}`;
    try {
      const { data } = await api.get(url);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const fetchUserFavorites = createAsyncThunk(
  "users/fetchUserFavorites",
  async ({ id, page, limit }, thunkAPI) => {
    const url = `/users/${id}/favorites?page=${page}&limit=${limit}`;
    try {
      const { data } = await api.get(url);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const fetchUserFollowers = createAsyncThunk(
  "users/fetchUserFollowers",
  async ({ id, page, limit }, thunkAPI) => {
    const url = `/users/${id}/followers?page=${page}&limit=${limit}`;
    try {
      const { data } = await api.get(url);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const fetchUserFollowing = createAsyncThunk(
  "users/fetchUserFollowing",
  async (_, thunkAPI) => {
    const url = "/users/following";
    try {
      const { data } = await api.get(url);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const followUser = createAsyncThunk("users/followUser", async (id, thunkAPI) => {
  const url = `/users/${id}/follow`;
  const state = thunkAPI.getState();
  const currentUserInfo = state.auth.userInfo;

  try {
    const { data } = await api.post(url);
    return { id, data, currentUserInfo };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const unfollowUser = createAsyncThunk("users/unfollowUser", async (id, thunkAPI) => {
  const url = `/users/${id}/unfollow`;
  const state = thunkAPI.getState();
  const currentUserInfo = state.auth.userInfo;

  try {
    const { data } = await api.delete(url);
    return { id, data, currentUserInfo };
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
