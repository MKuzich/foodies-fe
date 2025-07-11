import axios from "axios";

const {
  VITE_FOODIES_API_ENDPOINT,
  VITE_FOODIES_API_TOKEN,
  VITE_FOODIES_AUTH_DEV_MODE,
} = import.meta.env;

const getToken = () => {
  const TOKEN = VITE_FOODIES_AUTH_DEV_MODE
    ? VITE_FOODIES_API_TOKEN
    : localStorage.getItem("token"); // TODO: rewrite with user auth
  return TOKEN;
};

const api = axios.create({
  baseURL: VITE_FOODIES_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  },
});

export default api;
