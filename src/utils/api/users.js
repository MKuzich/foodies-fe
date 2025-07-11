import api from "./api";
import { userPageRecipes, userPageFollowers } from "../data";

export const fetchUserRecipes = (id) => {
  const url = `/users/${id}/recipes`;
  try {
    // const { data } = await api.get(url);
    return userPageRecipes;
    // return data;
  } catch (error) {
    return error;
  }
};

export const fetchUserFavorites = (id) => {
  const url = `/users/${id}/favorites`;
  try {
    // const { data } = await api.get(url);
    return userPageRecipes;
  } catch (error) {
    return error;
  }
};

export const fetchUserFollowers = (id) => {
  const url = `/users/${id}/followers`;
  try {
    // const { data } = await api.get(url);
    return userPageFollowers;
    // return data;
  } catch (error) {
    return error;
  }
};

export const fetchUserFollowing = () => {
  const url = `/users/following`;
  try {
    // const { data } = await api.get(url);
    return userPageFollowers;
  } catch (error) {
    return error;
  }
};

export const followUser = (id) => {
  const url = `/users/${id}/follow`;
  try {
    // const { data } = await api.post(url);
    return userPageFollowers;
    // return data;
  } catch (error) {
    return error;
  }
};

export const unfollowUser = (id) => {
  const url = `/users/${id}/unfollow`;
  try {
    // const { data } = await api.delete(url);
    return userPageFollowers;
    // return data;
  } catch (error) {
    return error;
  }
};
