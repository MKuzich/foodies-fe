import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { _fetchAreas } from "@/redux/areas/actions";
import { areasSelector } from "@/redux/areas/selectors";
import { _fetchCategories } from "@/redux/categories/actions";
import { categoriesSelector } from "@/redux/categories/selectors";
import { _fetchIngredients } from "@/redux/ingredients/actions";
import { ingredientsSelector } from "@/redux/ingredients/selectors";

export const useCategoriesAreasIngredientsFetch = () => {
  const dispatch = useDispatch();

  const areas = useSelector(areasSelector);
  const ingredients = useSelector(ingredientsSelector);
  const categories = useSelector(categoriesSelector);

  useEffect(() => {
    if (areas.length === 0) {
      dispatch(_fetchAreas());
    }
    if (ingredients.length === 0) {
      dispatch(_fetchIngredients());
    }
    if (categories.length === 0) {
      dispatch(_fetchCategories());
    }
  }, [dispatch]);
};
