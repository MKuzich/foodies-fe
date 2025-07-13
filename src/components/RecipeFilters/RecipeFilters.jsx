import styles from "./RecipeFilters.module.css";
import Dropdown from "../Dropdown/Dropdown";
import { categoriesSelector } from "../../redux/categories/selectors";
import { useSelector } from "react-redux";
import Button from "../Button/Button";
import { useSearchParams } from "react-router-dom";


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
const mockArea = [
  { id: 1, name: "American" },
  { id: 2, name: "Italian" },
  { id: 3, name: "Mexican" },
  { id: 4, name: "Japanese" },
  { id: 5, name: "French" },
];


function RecipeFilters() {

  const categories = useSelector(categoriesSelector);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleClearAll = () => {
    const params = Object.fromEntries(searchParams.entries());
    if (params.page) {
      setSearchParams({ page: 1 });
    } else {
      setSearchParams({});
    }
  }

  return (
    <div className={styles.recipeFilters}>
      <Dropdown placeholder="Ingredient" data={mockIngredients} shouldSetUrl={true} />
      <Dropdown placeholder="Area" data={mockArea} shouldSetUrl={true} />
      <Dropdown placeholder="Category" data={categories} shouldSetUrl={true} />
      <Button onClick={handleClearAll}>Clear all</Button>
    </div>
  );
}

export default RecipeFilters;