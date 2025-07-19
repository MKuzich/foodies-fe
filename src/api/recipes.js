import api from "./api";

export const getRecipesApi = async ({ category, page, ingredient, area, limit }) => {
  try {
    const response = await api.get(`recipes`, {
      params: {
        category,
        page,
        ingredient,
        area,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

export const getPopularRecipesApi = async (excludeId) => {
  try {
    const params = excludeId ? { exclude: excludeId } : {};
    const response = await api.get("recipes/popular", { params });

    return response.data;
  } catch (error) {
    console.error("Error fetching popular recipes:", error);
    throw error;
  }
};

export const getFavoriteRecipesApi = async () => {
  try {
    // TODO: check if this is correct i have check earlier but not sure it catch all cases
    if (!api.defaults.headers.common.Authorization) {
      return [];
    }

    const response = await api.get("recipes/favorites?limit=-1");
    return response.data;
  } catch (error) {
    console.error("Error fetching favorite recipes:", error);
    throw error;
  }
};

export const addFavoriteRecipeApi = async (recipe) => {
  try {
    const response = await api.post(`recipes/${recipe.id}/favorite`);
    if (response.status === 201) {
      return recipe;
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
