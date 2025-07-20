import api from "./api";

export const fetchTestimonials = async () => {
  try {
    const { data } = await api.get("/testimonials", {});
    return data;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    throw error;
  }
};

export const createTestimonial = async ({ text, recipeId }) => {
  try {
    const { data } = await api.post("/testimonials", { text, recipeId });
    return data;
  } catch (error) {
    console.error("Error create testimonial:", error);
    throw error;
  }
};

export const fetchTestimonialsByRecipeId = async ({ recipeId, page = 1, limit = 9 }) => {
  try {
    const { data } = await api.get(`/testimonials/${recipeId}?page=${page}&limit=${limit}`, {});
    return data;
  } catch (error) {
    console.error("Error fetching testimonials by recipeId:", error);
    throw error;
  }
};
