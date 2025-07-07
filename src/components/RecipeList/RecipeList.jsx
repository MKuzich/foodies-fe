import styles from "./RecipeList.module.css";
import RecipeCard from "../RecipeCard/RecipeCard";

function RecipeList() {
    return (
        <ul className={styles.recipeList}>
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
        </ul>
    );
}

export default RecipeList;