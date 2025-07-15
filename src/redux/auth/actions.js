import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../api";

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await api.auth.registerUser({
        name,
        email,
        password,
      });
      api.setAuthToken(response.token);
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.auth.loginUser({ email, password });
      api.setAuthToken(response.token);
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const userLogout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await api.auth.logoutUser();
    api.setAuthToken(null);
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const getUser = createAsyncThunk("auth/current", async (_, { rejectWithValue }) => {
  try {
    const response = await api.auth.fetchUser();
    return response;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.userToken;
      api.setAuthToken(token);
      const response = await api.auth.fetchUser();
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      const token = state.auth.userToken;
      return token ? true : false;
    },
  },
);
