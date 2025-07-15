import api from "./api";

export const getAreasApi = async () => {
  try {
    const response = await api.get("areas");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
