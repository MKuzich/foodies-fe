import api from "./api";

export const fetchUserRecipes = async (id, page = 1, limit = 9) => {
  const url = `users/${id}/recipes?page=${page}&limit=${limit}`;
  const { data } = await api.get(url);
  return data;
};

export const fetchUserFavorites = async (id, page = 1, limit = 9) => {
  const url = `users/recipes/favorites?page=${page}&limit=${limit}`;
  const { data } = await api.get(url);
  return data;
};

export const fetchUserFollowers = async (id, page = 1, limit = 9) => {
  const url = `users/${id}/followers?page=${page}&limit=${limit}`;
  const { data } = await api.get(url);
  return data;
};

export const fetchUserFollowing = async (id, page = 1, limit = 9) => {
  const url = `users/following?page=${page}&limit=${limit}`;
  const { data } = await api.get(url);
  return data;
};

export const followUser = async (id) => {
  const url = `users/${id}/follow`;
  const { data } = await api.post(url);
  return data;
};

export const unfollowUser = async (id) => {
  const url = `users/${id}/unfollow`;
  const { data } = await api.delete(url);
  return data;
};
