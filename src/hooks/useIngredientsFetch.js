import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ingredientsSelector, isLoadingSelector, errorSelector } from "@/redux/ingredients/selectors";
import { _fetchIngredients } from "@/redux/ingredients/actions";

export const useIngredientsFetch = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(ingredientsSelector);
  const isLoading = useSelector(isLoadingSelector);
  const error = useSelector(errorSelector);

  useEffect(() => {
    if (ingredients.length === 0 && !isLoading && !error) {
      dispatch(_fetchIngredients());
    }
  }, [dispatch, ingredients.length, isLoading, error]);

  return { ingredients, isLoading, error };
};