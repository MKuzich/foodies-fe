import api from "./api";

export const registerUser = async ({ name, email, password }) => {
  try {
    const { data } = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    return data;
  } catch (error) {
    console.error("Error register user:", error);
    throw error;
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const { data } = await api.post("/auth/login", {
      email,
      password,
    });
    return data;
  } catch (error) {
    console.error("Error login user:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await api.post("auth/logout", {});
  } catch (error) {
    console.error("Error logout user:", error);
    throw error;
  }
};

export const fetchUser = async () => {
  try {
    const { data } = await api.get("/auth/current", {});
    return data;
  } catch (error) {
    console.error("Error fetch user:", error);
    throw error;
  }
};
