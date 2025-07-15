import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_FOODIES_API_ENDPOINT || "https://foodies-be-oruu.onrender.com/api/",
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;
