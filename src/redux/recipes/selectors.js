

export const recipesSelector = (state) => state.recipes.recipes;
export const paginationSelector = (state) => state.recipes.pagination;
export const querySelector = (state) => state.recipes.query;
export const isLoadingSelector = (state) => state.recipes.isLoading;
export const errorSelector = (state) => state.recipes.error;