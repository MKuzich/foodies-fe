

export const recipesSelector = (state) => state.recipes.recipes;
export const isLoadingSelector = (state) => state.recipes.isLoading;
export const errorSelector = (state) => state.recipes.error;
export const pageSelector = (state) => state.recipes.page;
export const limitSelector = (state) => state.recipes.limit;