import api from "./api";
export const getCategoriesApi = async () => {
  try {
    const response = await api.get("categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
