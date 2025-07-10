import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api/api";
import { userPageRecipes, userPageFollowers } from "../../utils/data";
export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (id, thunkAPI) => {
    const url = `/users/${id}`;
    try {
      const { data } = await api.get(url);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchUserRecipes = createAsyncThunk(
  "users/fetchUserRecipes",
  async (id, thunkAPI) => {
    const url = `/users/${id}/recipes`;
    try {
      // const { data } = await api.get(url);
      return userPageRecipes;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchUserFavorites = createAsyncThunk(
  "users/fetchUserFavorites",
  async (id, thunkAPI) => {
    const url = `/users/${id}/favorites`;
    try {
      // const { data } = await api.get(url);
      return userPageRecipes;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchUserFollowers = createAsyncThunk(
  "users/fetchUserFollowers",
  async (id, thunkAPI) => {
    const url = `/users/${id}/followers`;
    try {
      // const { data } = await api.get(url);
      return userPageFollowers;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchUserFollowing = createAsyncThunk(
  "users/fetchUserFollowing",
  async (id, thunkAPI) => {
    const url = `/users/${id}/following`;
    try {
      // const { data } = await api.get(url);
      return userPageFollowers;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
