import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../api/api";
import {
  deleteTestimonialsById,
  followUserById,
  getUser,
  getUserFavorites,
  getUserFollowers,
  getUserFollowing,
  getUserRecipes,
  getUserTestimonials,
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
  async ({ page, limit }, thunkAPI) => {
    try {
      return await getUserFollowing({ page, limit });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const followUser = createAsyncThunk("users/followUserById", async (id, thunkAPI) => {
  const state = thunkAPI.getState();
  const userId = state.users.user.id;
  const currentUserId = state.auth.userInfo.id;
  const tab = state.users.tab;
  try {
    if (tab === "following") {
      const data = await followUserById({
        id,
        userId,
        callback: getUserFollowing,
      });
      return { id, data, currentUserId };
    }

    if (tab === "followers") {
      const data = await followUserById({
        id,
        userId,
        callback: getUserFollowers,
      });
      return { id, data, currentUserId };
    }
    return {
      id,
      data: await followUserById({ id, userId }),
      currentUserId,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const unfollowUser = createAsyncThunk("users/unfollowUser", async (id, thunkAPI) => {
  const state = thunkAPI.getState();
  const userId = state.users.user.id;
  const tab = state.users.tab;
  const currentUserId = state.auth.userInfo.id;

  try {
    if (tab === "following") {
      const data = await unfollowUserById({
        id,
        userId,
        callback: getUserFollowing,
      });
      return { id, data, currentUserId };
    }

    if (tab === "followers") {
      const data = await unfollowUserById({
        id,
        userId,
        callback: getUserFollowers,
      });
      return { id, data, currentUserId };
    }

    return {
      id,
      data: await unfollowUserById({ id, userId }),
      currentUserId,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const changeAvatar = createAsyncThunk(
  "users/changeAvatar",
  async (newAvatarFile, thunkAPI) => {
    const url = "/auth/avatars";
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

export const fetchUserTestimonials = createAsyncThunk(
  "users/fetchUserTestimonials",
  async ({ userId, page, limit }, thunkAPI) => {
    try {
      return await getUserTestimonials({ userId, page, limit });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const deleteTestimonial = createAsyncThunk(
  "testimonials/deleteTestimonial",
  async (testimonialId, { rejectWithValue }) => {
    try {
      const response = await deleteTestimonialsById(testimonialId);
      return response;
    } catch (err) {
      return rejectWithValue(err.message || "Unknown error");
    }
  },
);
