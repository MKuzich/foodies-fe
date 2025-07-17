import api from "./api";

export const getRecipesApi = async (category, page = 1, ingredient, area, limit = 8) => {
  try {
    const response = await api.get(`recipes`, {
      params: {
        category,
        page,
        limit,
        ingredient,
        area,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

export const getPopularRecipesApi = async () => {
  try {
    const response = await api.get("recipes/popular");
    return response.data;
  } catch (error) {
    console.error("Error fetching popular recipes:", error);
    throw error;
  }
};

export const getFavoriteRecipesApi = async () => {
  try {
    const response = await api.get("recipes/favorites");
    return response.data;
  } catch (error) {
    console.error("Error fetching favorite recipes:", error);
    throw error;
  }
};

export const addFavoriteRecipeApi = async (recipeId) => {
  try {
    const response = await api.post(`recipes/${recipeId}/favorite`);
    if (response.status === 201) {
      return recipeId;
    }
  } catch (error) {
    console.error("Error adding favorite recipe:", error);
    throw error;
  }
};

export const removeFavoriteRecipeApi = async (recipeId) => {
  try {
    const response = await api.delete(`recipes/${recipeId}/favorite`);
    if (response.status === 204) {
      return recipeId;
    }
  } catch (error) {
    console.error("Error removing favorite recipe:", error);
    throw error;
  }
};
