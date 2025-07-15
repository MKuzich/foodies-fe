import styles from "./RecipeFilters.module.css";
import Dropdown from "../Dropdown/Dropdown";
import Button from "../Button/Button";
import { useSearchParams } from "react-router-dom";
import { useCategoriesAreasIngredientsFetch } from "@/hooks/useCategoriesAreasIngredientsFetch";


function RecipeFilters() {

  const { categories, areas, ingredients } = useCategoriesAreasIngredientsFetch();

  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");

  const handleClearAll = () => {
    if (category) {
      setSearchParams({ category, page: 1 });
    } else {
      setSearchParams({ page: 1 });
    }
  }

  const shouldShowCategories = category ? false : true;


  return (
    <div className={styles.recipeFilters}>
      <Dropdown placeholder="Ingredient" data={ingredients} shouldSetUrl={true} search={true} />
      <Dropdown placeholder="Area" data={areas} shouldSetUrl={true} />
      {shouldShowCategories && <Dropdown placeholder="Category" data={categories} shouldSetUrl={true} />}
      <Button onClick={handleClearAll}>Clear all</Button>
    </div>
  );
}

export default RecipeFilters;