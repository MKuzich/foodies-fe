import { enshureEnoughItems } from "../../utils/helpers";
import { userPageRecipes, userPageFollowers } from "../../utils/data";

export const selectUser = (state) => state.users.user;
export const selectIsUserCurrentUser = (state) => {
  return true;
  if (state.users.user) {
    return state.users.user.id === state.user.id;
  }
  // return false;
};
export const selectIsUserIsFollowed = (state) => state.users.isUserIsFollowed;
export const selectUserRecepies = (state) => {
  // return [];
  // return state.users.user.recipes;
  return enshureEnoughItems(userPageRecipes, 10);
};
export const selectUserFavorites = (state) => {
  // return [];
  // state.users.user.favorites;
  return enshureEnoughItems(userPageRecipes, 10);
};
export const selectUserFollowers = (state) => {
  // return [];
  // state.users.user.followers;
  return enshureEnoughItems(userPageFollowers, 10);
};
export const selectUserFollowing = (state) => {
  // return [];
  // state.users.user.following;
  return enshureEnoughItems(userPageFollowers, 10);
};
