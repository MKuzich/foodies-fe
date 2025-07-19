import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { addRecipeReducer } from "./addRecipe/slice";
import { areasReducer } from "./areas/slice";
import authReducer from "./auth/slice";
import { categoriesReducer } from "./categories/slice";
import { ingredientsReducer } from "./ingredients/slice";
import { recipesReducer } from "./recipes/slice";
import { rootReducer } from "./root/slice";
import { testimonialsReducer } from "./testimonials/slice";
import { userReducer } from "./users/slice";

const persistConfig = {
  key: "auth",
  storage,
  blacklist: ["authModal", "testimonials", "recipes", "ingredients", "areas", "categories"],
  whitelist: ["userToken"],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const reducers = combineReducers({
  root: rootReducer,
  auth: persistedAuthReducer,
  users: userReducer,
  categories: categoriesReducer,
  testimonials: testimonialsReducer,
  recipes: recipesReducer,
  ingredients: ingredientsReducer,
  areas: areasReducer,
  addRecipe: addRecipeReducer,
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
