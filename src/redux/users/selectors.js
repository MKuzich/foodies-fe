import { enshureEnoughItems } from "../../utils/helpers";
import { userPageRecipes, userPageFollowers } from "../../utils/data";

export const selectUser = (state) => state.users.user;
export const selectIsUserCurrentUser = (state) => {
  return true;
  // if (state.users.user) {
  //   return state.users.user.id === state.user.id;
  // }
  return false;
};
export const selectIsUserIsFollowed = (state) => state.users.isUserIsFollowed;
export const selectUserRecepies = (state) => {
  return enshureEnoughItems(state.users.recipes, 10);
};
export const selectUserFavorites = (state) => {
  // state.users.favorites;
  return enshureEnoughItems(state.users.favorites, 10);
};
export const selectUserFollowers = (state) => {
  // state.users.followers;
  return enshureEnoughItems(state.users.followers, 10);
};
export const selectUserFollowing = (state) => {
  // return state.users.following;
  return enshureEnoughItems(state.users.following, 10);
};
