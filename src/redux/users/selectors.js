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

export const selectUserRecipes = (state) => state.users.user.recipes;
export const selectUserFavorites = (state) => state.users.user.favorites;
export const selectUserFollowers = (state) => state.users.user.followers;
export const selectUserFollowing = (state) => state.users.user.following;
export const selectTabOpened = (state) => state.users.tab;
export const selectPage = (state) => state.users.filter.page;
export const selectFilter = (state) => state.users.filter;
export const selectTotalPages = (state) => state.users.totalPages;
