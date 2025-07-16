import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { areasSelector } from "@/redux/areas/selectors";
import { ingredientsSelector } from "@/redux/ingredients/selectors";
import { categoriesSelector } from "@/redux/categories/selectors";
import { _fetchAreas } from "@/redux/areas/actions";
import { _fetchIngredients } from "@/redux/ingredients/actions";
import { _fetchCategories } from "@/redux/categories/actions";

// Simple hook for fetching data with store check
export const useCategoriesAreasIngredientsFetch = () => {
  const dispatch = useDispatch();
  
  // Check if data exists in store
  const areas = useSelector(areasSelector);
  const ingredients = useSelector(ingredientsSelector);
  const categories = useSelector(categoriesSelector);

  useEffect(() => {
    // Fetch only if data doesn't exist
    if (areas.length === 0) {
      dispatch(_fetchAreas());
    }
    if (ingredients.length === 0) {
      dispatch(_fetchIngredients());
    }
    if (categories.length === 0) {
      dispatch(_fetchCategories());
    }
  }, [dispatch, areas.length, ingredients.length, categories.length]);

  // Hook doesn't return anything, get data through selectors
};