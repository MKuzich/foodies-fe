import api from "./api";

export const getUser = async (id) => {
  const url = `/users/${id}`;
  try {
    const { data } = await api.get(url);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getUserRecipes = async ({ id, page, limit }) => {
  const url = `/users/${id}/recipes?page=${page}&limit=${limit}`;
  try {
    const { data } = await api.get(url);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getUserFavorites = async ({ page = 1, limit = 9 }) => {
  const url = `recipes/favorites?page=${page}&limit=${limit}`;
  try {
    const { data } = await api.get(url);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getUserFollowers = async ({ id, page = 1, limit = 9 }) => {
  const url = `/users/${id}/followers?page=${page}&limit=${limit}`;
  try {
    const { data } = await api.get(url);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getUserFollowing = async ({ page = 1, limit = 9 }) => {
  const url = `/users/following?page=${page}&limit=${limit}`;
  try {
    const { data } = await api.get(url);
    return data;
  } catch (error) {
    throw error;
  }
};

export const followUserById = async ({ id, userId, callback, ...params }) => {
  const url = `/users/${id}/follow`;
  try {
    await api.post(url);
    if (callback) {
      const data = await callback({ id: userId, ...params });
      return data;
    }
  } catch (error) {
    throw error;
  }
};

export const unfollowUserById = async ({ id, userId, callback, ...params }) => {
  const url = `/users/${id}/unfollow`;
  try {
    await api.delete(url);
    if (callback) {
      const data = await callback({ id: userId, ...params });
      return data;
    }
  } catch (error) {
    throw error;
  }
};

export const getUserTestimonials = async ({ userId, page = 1, limit = 9 }) => {
  const url = `/testimonials/user/${userId}`;
  try {
    const { data } = await api.get(url, {
      params: { page, limit },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteTestimonialsById = async (testimonialId) => {
  try {
    const { data } = await api.delete(`/testimonials/user/${testimonialId}`, {});
    return data;
  } catch (error) {
    console.error(`Error deleting testimonials by id: ${testimonialId}`, error);
    throw error;
  }
};
