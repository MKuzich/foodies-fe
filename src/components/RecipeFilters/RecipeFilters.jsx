import styles from "./RecipeFilters.module.css";
import InputCheckbox from "../InputCheckbox/InputCheckbox";

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
    return (
        <div className={styles.recipeFilters}>
            <InputCheckbox placeholder="Ingredients" data={mockIngredients} />
            <InputCheckbox placeholder="Area" data={mockArea} />
        </div>
    );
}

export default RecipeFilters;