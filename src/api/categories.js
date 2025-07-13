// import api from "./api";
import { apiTest } from "./api";

export const getCategoriesApi = async () => {
    try {
        const response = await apiTest.get("api/categories");
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};
