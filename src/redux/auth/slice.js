import { createSlice } from "@reduxjs/toolkit";

import { changeAvatar } from "../users/operations";
import { getUser, refreshUser, registerUser, userLogin, userLogout } from "./actions";

const initialState = {
  loading: false,
  userInfo: null,
  userToken: null,
  error: null,
  success: false,
  authModal: null,
  authCanceled: false,
  next: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openSignIn: (state) => {
      state.authModal = "signin";
      state.error = null;
    },
    openSignUp: (state) => {
      state.authModal = "signup";
      state.error = null;
    },
    openLogout: (state) => {
      state.authModal = "logout";
      state.error = null;
    },
    closeModal: (state) => {
      state.authModal = null;
      state.error = null;
      if (state.next) {
        state.authCanceled = true;
      }
      state.next = null;
    },
    setAuthCanceled: (state) => {
      state.authCanceled = false;
      state.next = null;
    },
    setNext: (state, { payload }) => {
      state.next = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload.user;
        state.userToken = payload.token;
        state.error = null;
        state.success = true;
        state.authModal = null;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload.user;
        state.userToken = payload.token;
        state.error = null;
        state.success = true;
        state.authModal = null;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(userLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.loading = false;
        state.userInfo = null;
        state.userToken = null;
        state.success = true;
        state.authModal = null;
        state.next = "/";
        state.authCanceled = false;
      })
      .addCase(userLogout.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
        state.success = true;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        state.userInfo = payload;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.userInfo = null;
        state.userToken = null;
      })
      .addCase(changeAvatar.fulfilled, (state, { payload }) => {
        state.userInfo.avatarURL = payload.avatarURL;
      });
  },
});

export const { openSignIn, openSignUp, openLogout, closeModal, setNext, setAuthCanceled } =
  slice.actions;
export const selectCurrentUser = (state) =>
  state.auth.loading ? false : state.auth.userToken ? true : false;
export const selectUserInfo = (state) => state.auth.userInfo;
export const selectAuthCanceled = (state) => state.auth.authCanceled;
export const selectNext = (state) => state.auth.next;
export default slice.reducer;
