import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTestimonialsApi } from "../../api/testimonials";

export const fetchTestimonials = createAsyncThunk(
    'testimonials/fetchTestimonials',
    async (_, { rejectWithValue }) => {
      try {
        const testimonials = await getTestimonialsApi();
        return testimonials;
      } catch (err) {
        return rejectWithValue(err.message || "Unknown error");

      }
    }
  );