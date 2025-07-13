// import api from "./api";
import api from "./api";
import axios from "axios";

export const getCategoriesApi = async () => {
    try {
        // const response = await api.get("categories");
        const response = await axios.get("http://localhost:3000/api/categories");
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};
