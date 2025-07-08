export const selectUser = (state) => state.users.user;
export const selectIsUserCurrentUser = (state) => {
  return true;
  if (state.users.user) {
    return state.users.user.id === state.user.id;
  }
  return false;
};
export const selectIsUserIsFollowed = (state) => false;
export const selectIsUserIsSubscribed = (state) => false;
