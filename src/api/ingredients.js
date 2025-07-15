import api from "./api";

export const getIngredientsApi = async () => {
  try {
    const response = await api.get("ingredients");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
