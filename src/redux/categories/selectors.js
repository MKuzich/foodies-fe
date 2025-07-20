import { createSelector } from "reselect";

export const selectedCategory = (state) => state.categories.selectedCategory;
export const categoriesSelector = (state) => state.categories.categories;
export const isLoadingCategoriesSelector = (state) => state.categories.isLoading;
export const errorCategoriesSelector = (state) => state.categories.error;
export const showAllSelector = (state) => state.categories.showAll;

export const selectCategoryByName = (categoryName) =>
  createSelector(categoriesSelector, (categories) => {
    if (!categoryName) return null;
    return categories.find(
      (category) => category.name.toLowerCase() === categoryName.toLowerCase(),
    );
  });
