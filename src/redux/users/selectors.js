export const selectUser = (state) => state.users.user;
export const selectIsUserCurrentUser = (state) => {
  return false;
  // if (state.users.user) {
  //   return state.users.user.id === state.user.id;
  // }
  // return false;
};
export const selectIsUserIsFollowed = (state) => false;
export const selectIsUserIsSubscribed = (state) => false;
export const selectUserRecepies = (state) => {
  return [];
  // return state.users.user.recipes;
};
export const selectUserFavorites = (state) => {
  return [];
  // state.users.user.favorites;
};
export const selectUserFollowers = (state) => {
  return [];
  // state.users.user.followers;
};
export const selectUserFollowing = (state) => {
  return [];
  // state.users.user.following;
};
