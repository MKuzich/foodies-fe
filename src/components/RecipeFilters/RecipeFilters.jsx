import styles from "./RecipeFilters.module.css";
import Dropdown from "../Dropdown/Dropdown";
import Button from "../Button/Button";
import { useSearchParams } from "react-router-dom";
import { useCategoriesAreasIngredientsFetch } from "@/hooks/useCategoriesAreasIngredientsFetch";
import { useSelector } from "react-redux";
import { areasSelector, } from "@/redux/areas/selectors";
import { ingredientsSelector } from "@/redux/ingredients/selectors";
import { categoriesSelector } from "@/redux/categories/selectors";
import DropdownSearch from "../DropdownSearch/DropdownSearch";
import { showAllRecipesSelector } from "@/redux/recipes/selectors";
import { useDispatch } from "react-redux";
import { setShowAllRecipes } from "@/redux/recipes/slice";
import { useEffect } from "react";
import { wasShowAllRecipesInitializedSelector } from "@/redux/recipes/selectors";
import { setWasShowAllRecipesInitialized } from "@/redux/recipes/slice";

function RecipeFilters() {
  const dispatch = useDispatch();


  const categories = useSelector(categoriesSelector);
  const areas = useSelector(areasSelector);
  const ingredients = useSelector(ingredientsSelector);
  const wasShowAllRecipesInitialized = useSelector(wasShowAllRecipesInitializedSelector);

  const showAllRecipes = useSelector(showAllRecipesSelector);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    if(wasShowAllRecipesInitialized) return;
    if(category) {
      dispatch(setShowAllRecipes(false));
    } else {
      dispatch(setShowAllRecipes(true));
    }
    dispatch(setWasShowAllRecipesInitialized(true));
  }, [dispatch, showAllRecipes, wasShowAllRecipesInitialized]);


  const handleClearAll = () => {
    if (category) {
      setSearchParams({ category, page: 1 });
    } else {
      setSearchParams({ page: 1 });
    }
  }




  return (
    <div className={styles.recipeFilters}>
      <DropdownSearch placeholder="Ingredient" data={ingredients} shouldSetUrl={true} />
      <Dropdown placeholder="Area" data={areas} shouldSetUrl={true} />
      {showAllRecipes && <Dropdown placeholder="Category" data={categories} shouldSetUrl={true} />}
      <Button onClick={handleClearAll}>Clear all</Button>
    </div>
  );
}

export default RecipeFilters;