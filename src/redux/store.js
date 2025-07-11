
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { rootReducer } from './root/slice';
import authReducer from './auth/authSlice';
import { userReducer } from './users/slice';
import { categoriesReducer } from './categories/slice';
import { testimonialsReducer } from './testimonials/slice';


const persistConfig = {
  key: "auth",
  storage,
  blacklist: ['authModal', 'testimonials', 'categories'],
  whitelist: ["userToken"],


};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const reducers = combineReducers({
  root: rootReducer,
  auth: persistedAuthReducer,
  users: userReducer,
  categories: categoriesReducer,
  testimonials: testimonialsReducer,
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
