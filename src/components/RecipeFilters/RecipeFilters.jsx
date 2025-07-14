import styles from "./RecipeFilters.module.css";
import Dropdown from "../Dropdown/Dropdown";
import { categoriesSelector } from "../../redux/categories/selectors";
import { useSelector } from "react-redux";
import Button from "../Button/Button";
import { useSearchParams } from "react-router-dom";
import { useAreasFetch } from "@/hooks/useAreasFetch";


const mockIngredients = [
  { id: 1, name: "Eggs" },
  { id: 2, name: "Flour" },
  { id: 3, name: "Sugar" },
  { id: 4, name: "Butter" },
  { id: 5, name: "Milk" },
  { id: 6, name: "Salt" },
  { id: 7, name: "Baking Powder" },
  { id: 8, name: "Vanilla Extract" },
  { id: 9, name: "Chocolate" },
  { id: 10, name: "Strawberries" },
];



function RecipeFilters() {

  const categories = useSelector(categoriesSelector);

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

  const { areas, isLoading: isLoadingAreas, error: errorAreas } = useAreasFetch();

  return (
    <div className={styles.recipeFilters}>
      <Dropdown placeholder="Ingredient" data={mockIngredients} shouldSetUrl={true} />
      <Dropdown placeholder="Area" data={areas} shouldSetUrl={true} />
      {shouldShowCategories && <Dropdown placeholder="Category" data={categories} shouldSetUrl={true} />}
      <Button onClick={handleClearAll}>Clear all</Button>
    </div>
  );
}

export default RecipeFilters;