import { createAsyncThunk } from "@reduxjs/toolkit";

import { getIngredientsApi } from "../../api/ingredients";

export const _fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async (_, { rejectWithValue }) => {
    try {
      const ingredients = await getIngredientsApi();
      return ingredients;
    } catch (err) {
      return rejectWithValue(err.message || "Unknown error");
    }
  },
);
