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
export const selectUserTestimonials = (state) => state.users.user.testimonials;

export const selectTabOpened = (state) => state.users.tab;
export const selectPage = (state) => state.users.filter.page;
export const selectFilter = (state) => state.users.filter;
export const selectTotalPages = (state) => state.users.totalPages;
export const selectUsersFollowLoading = (state) => state.users.followLoading;
export const selectUsersRecipesLoading = (state) => state.users.recipesLoading;
export const selectUsersUserLoading = (state) => state.users.userLoading;
export const selectUsersTestimonialsLoading = (state) => state.users.testimonialsLoading;

export const selectItemsCount = (state) => {
  let itemsCount = 0;
  if (state.users.tab === "recipes") {
    itemsCount = state.users.user.recipes.length;
  }
  if (state.users.tab === "favorites") {
    itemsCount = state.users.user.favorites.length;
  }
  if (state.users.tab === "followers") {
    itemsCount = state.users.user.followers.length;
  }
  if (state.users.tab === "following") {
    itemsCount = state.users.user.following.length;
  }
  if (state.users.tab === "testimonials") {
    itemsCount = state.users.user.testimonials.length;
  }
  return itemsCount !== 0 ? itemsCount : 5;
};
