import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { areasSelector, isLoadingSelector, errorSelector } from "@/redux/areas/selectors";
import { ingredientsSelector,  isLoadingIngredientsSelector,  errorIngredientsSelector } from "@/redux/ingredients/selectors";
import { categoriesSelector, isLoadingCategoriesSelector, errorCategoriesSelector } from "@/redux/categories/selectors";
import { _fetchAreas } from "@/redux/areas/actions";
import { _fetchIngredients } from "@/redux/ingredients/actions";
import { _fetchCategories } from "@/redux/categories/actions";

export const useCategoriesAreasIngredientsFetch = () => {
  const dispatch = useDispatch();
  console.log("useCategoriesAreasIngredientsFetc  TEST FOR RERENDER CONTROL");

  const areas = useSelector(areasSelector);
  const isLoading = useSelector(isLoadingSelector);
  const error = useSelector(errorSelector);

  const ingredients = useSelector(ingredientsSelector);
  const isLoadingIngredients = useSelector(isLoadingIngredientsSelector);
  const errorIngredients = useSelector(errorIngredientsSelector);

  const categories = useSelector(categoriesSelector);
  const isLoadingCategories = useSelector(isLoadingCategoriesSelector);
  const errorCategories = useSelector(errorCategoriesSelector);

  useEffect(() => {
    if (areas.length === 0 && !isLoading && !error) {
      dispatch(_fetchAreas());
    }
  }, [dispatch, areas.length, isLoading, error]);

  useEffect(() => {
    if (ingredients.length === 0 && !isLoadingIngredients && !errorIngredients) {
      dispatch(_fetchIngredients());
    }
  }, [dispatch, ingredients.length, isLoadingIngredients, errorIngredients]);

  useEffect(() => {
    if (categories.length === 0 && !isLoadingCategories && !errorCategories) {
      dispatch(_fetchCategories());
    }
  }, [dispatch, categories.length, isLoadingCategories, errorCategories]);

  return { 
    areas, 
    isLoading, 
    error,
    ingredients,
    isLoadingIngredients,
    errorIngredients,
    categories,
    isLoadingCategories,
    errorCategories
  };
};