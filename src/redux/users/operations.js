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

export const followUser = createAsyncThunk("users/followUser", async (id, thunkAPI) => {
  const url = `/users/${id}/follow`;
  try {
    const { data } = await api.post(url);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const unfollowUser = createAsyncThunk("users/unfollowUser", async (id, thunkAPI) => {
  const url = `/users/${id}/unfollow`;
  try {
    const { data } = await api.delete(url);
    return data;
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
