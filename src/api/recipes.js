import api from "./api";

export const getRecipesApi = async (category, page=1, ingredient, area, limit=8) => {
  try {
    const response = await api.get(`recipes`, {
      params: {
        category,
        page,
        limit,
        ingredient,
        area
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};