export const isLoadingSelector = (state) => state.recipes.isLoading;
export const errorSelector = (state) => state.recipes.error;
export const popularRecipesSelector = (state) => state.recipes.popularRecipes;
export const showAllRecipesSelector = (state) => state.recipes.showAllRecipes;
export const wasShowAllRecipesInitializedSelector = (state) =>
  state.recipes.wasShowAllRecipesInitialized;
export const favoriteRecipesSelector = (state) => state.recipes.favoriteRecipes;
