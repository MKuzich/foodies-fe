import { createAsyncThunk } from "@reduxjs/toolkit";

import { getAreasApi } from "@/api/areas";

export const _fetchAreas = createAsyncThunk("areas/fetchAreas", async (_, { rejectWithValue }) => {
  try {
    const areas = await getAreasApi();
    return areas;
  } catch (err) {
    return rejectWithValue(err.message || "Unknown error");
  }
});
