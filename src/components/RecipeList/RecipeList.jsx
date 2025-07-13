import styles from "./RecipeList.module.css";
import RecipeCard from "../RecipeCard/RecipeCard";
import { useSelector } from "react-redux";
import { recipesSelector } from "@/redux/recipes/selectors";


function RecipeList() {
  const recipes = useSelector(recipesSelector);

  console.log(recipes);

  if (recipes.length === 0) {
    return (
      <div className={styles.recipeListEmpty}>
        <h3 className={styles.recipeListTitle}>Oops! We couldn't find any recipes. Please try again.</h3>
      </div>
    )
  }
 

  return (
    <ul className={styles.recipeList}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </ul>
  );
}

export default RecipeList;