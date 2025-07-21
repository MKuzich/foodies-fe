import { useRef } from "react";

import RecipeCard, { SkeletonCard } from "../RecipeCard/RecipeCard";
import styles from "./RecipeList.module.css";

function RecipeList({ recipes, isLoading, error }) {
  const recipesHeight = useRef(null);

  if (recipes.length === 0 && !isLoading && !error) {
    return (
      <div className={styles.recipeListEmpty}>
        <h3 className={styles.recipeListTitle}>
          Looks like there’s nothing here yet. Try a different filter
        </h3>
      </div>
    );
  }

  return (
    <ul className={styles.recipeList} ref={recipesHeight}>
      {isLoading
        ? Array.from({ length: 12 }).map((_, index) => <SkeletonCard key={index} />)
        : recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
    </ul>
  );
}

export default RecipeList;
