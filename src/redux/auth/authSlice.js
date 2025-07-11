import { createSlice } from '@reduxjs/toolkit';
import { registerUser, userLogin, userLogout, getUser } from './authActions';

const initialState = {
  loading: false,
  userInfo: null,
  userToken: null,
  error: null,
  success: false,
  authModal: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    openSignIn: (state) => {
      state.authModal = 'signin';
      state.error = null;
    },
    openSignUp: (state) => {
      state.authModal = 'signup';
      state.error = null;
    },
    openLogout: (state) => {
      state.authModal = 'logout';
      state.error = null;
    },
    closeModal: (state) => {
      state.authModal = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //login user
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
      // register user
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
      // logout user
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
      })
      .addCase(userLogout.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // get user
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
      });
  },
});

export const { openSignIn, openSignUp, openLogout, closeModal } = slice.actions;

export default slice.reducer;
