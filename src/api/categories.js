// import api from "./api";
import { api } from "./api";

export const getCategoriesApi = async () => {
    try {
        const response = await api.get("api/categories");
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};
