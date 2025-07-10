import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { rootReducer } from "./root/slice";
import authReducer from "./authSlice";
import { userReducer } from "./users/slice";
import { categoriesReducer } from "./categories/slice";

const persistConfig = {
  key: "user",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const reducers = combineReducers({
  root: rootReducer,
  user: persistedAuthReducer,
  users: userReducer,
  categories: categoriesReducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
