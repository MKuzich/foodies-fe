import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin, userLogout } from './authActions'

const initialState = {
  loading: false,
  userInfo: null,
  userToken: null,
  error: null,
  success: false,
  authModal: null
}

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openSignIn: (state) => { 
      state.authModal = 'signin'; 
    },
    openSignUp: (state) => { 
      state.authModal = 'signup'; 
    },
    closeModal: (state) => { 
      state.authModal = null; 
    },
  },
  extraReducers: (builder) => {
    builder
    //login user
    .addCase(userLogin.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loading = false
      state.userInfo = payload
      state.userToken = payload.userToken
      state.success = true 
    })
    .addCase(userLogin.rejected, (state, { payload }) => {
      state.loading = false
      state.error = payload
    })
    // register user
    .addCase(registerUser.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(registerUser.fulfilled, (state, { payload }) => {
      state.loading = false
      state.userInfo = payload
      state.userToken = payload.userToken
      state.success = true 
    })
    .addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false
      state.error = payload
    })
     // logout user
    .addCase(userLogout.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(userLogout.fulfilled, (state) => {
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.success = true 
    })
    .addCase(userLogout.rejected, (state, { payload }) => {
     state.loading = false
      state.error = payload
    })
  },
});

export const { openSignIn, openSignUp, closeModal } = slice.actions;

export default slice.reducer;
