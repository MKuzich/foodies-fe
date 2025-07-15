import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../api";

export const fetchTestimonials = createAsyncThunk(
  "testimonials/fetchTestimonials",
  async (_, { rejectWithValue }) => {
    try {
      const testimonials = await api.testimonials.fetchTestimonials();
      return testimonials;
    } catch (err) {
      return rejectWithValue(err.message || "Unknown error");
    }
  },
);
