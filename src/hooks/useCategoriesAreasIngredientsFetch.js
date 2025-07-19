import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { _fetchAreas } from "@/redux/areas/actions";
import { areasSelector } from "@/redux/areas/selectors";
import { _fetchCategories } from "@/redux/categories/actions";
import { categoriesSelector } from "@/redux/categories/selectors";
import { _fetchIngredients } from "@/redux/ingredients/actions";
import { ingredientsSelector } from "@/redux/ingredients/selectors";

// Simple hook for fetching data with store check
export const useCategoriesAreasIngredientsFetch = () => {
  const dispatch = useDispatch();
  console.log("useCategoriesAreasIngredientsFetch TEST RERENDER");

  // Check if data exists in store
  const areas = useSelector(areasSelector);
  const ingredients = useSelector(ingredientsSelector);
  const categories = useSelector(categoriesSelector);

  useEffect(() => {
    // Fetch only if data doesn't exist
    if (areas.length === 0) {
      console.log("areas", areas);
      console.log("fetching areas");
      dispatch(_fetchAreas());
    }
    if (ingredients.length === 0) {
      console.log("ingredients", ingredients);
      console.log("fetching ingredients");
      dispatch(_fetchIngredients());
    }
    if (categories.length === 0) {
      console.log("categories", categories);
      console.log("fetching categories");
      dispatch(_fetchCategories());
    }
  }, [dispatch]);

  // Hook doesn't return anything, get data through selectors
};
