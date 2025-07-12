export const selectUser = (state) => state.users.user;
export const selectIsUserCurrentUser = (state) => {
  if (!state.auth.userInfo) {
    return false;
  }
  if (state.users.user) {
    return state.users.user.id === state.auth.userInfo.id;
  }
  return false;
};
export const selectIsUserIsFollowed = (state) => state.users.user.isFollowed;
export const selectUserExists = (state) => state.users.user.id !== "";

export const selectUserRecipes = (state) => state.users.recipes;
export const selectUserFavorites = (state) => state.users.favorites;
export const selectUserFollowers = (state) => state.users.followers;
export const selectUserFollowing = (state) => state.users.following;
