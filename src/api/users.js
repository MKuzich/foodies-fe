import api from "./api";

export const fetchUserRecipes = async (id) => {
  const url = `/users/${id}/recipes`;
  const { data } = await api.get(url);
  return data;
};

export const fetchUserFavorites = async (id) => {
  const url = `/users/${id}/favorites`;
  const { data } = await api.get(url);
  return data;
};

export const fetchUserFollowers = async (id) => {
  const url = `/users/${id}/followers`;
  const { data } = await api.get(url);
  return data;
};

export const fetchUserFollowing = async (id) => {
  const url = `/users/${id}/following`;
  const { data } = await api.get(url);
  return data;
};

export const followUser = async (id) => {
  const url = `/users/${id}/follow`;
  const { data } = await api.post(url);
  return data;
};

export const unfollowUser = async (id) => {
  const url = `/users/${id}/unfollow`;
  const { data } = await api.delete(url);
  return data;
};

export const changeAvatar = async (newAvatarFile) => {
  const formData = new FormData();
  formData.append("avatar", newAvatarFile, newAvatarFile.name);
  const url = "/auth/avatars";
  const { data } = await api.patch(url, formData);
  return data;
};
