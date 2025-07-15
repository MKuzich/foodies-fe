import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  errorSelector,
  isLoadingSelector,
  popularRecipesSelector,
} from "../../redux/recipes/selectors";
import { fetchPopularRecipes } from "../../redux/recipes/slice";
import RecipeCard from "../RecipeCard/RecipeCard";
import styles from "./PopularRecipes.module.css";

function PopularRecipes() {
  const dispatch = useDispatch();
  const recipes = useSelector(popularRecipesSelector);
  const loading = useSelector(isLoadingSelector);
  const error = useSelector(errorSelector);

  useEffect(() => {
    dispatch(fetchPopularRecipes());
  }, [dispatch]);

  return (
    <div>
      <h2 className={styles.popularRecipesTitle}>Popular Recipes</h2>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <ul className={styles.popularRecipesList}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </ul>
    </div>
  );
}

export default PopularRecipes;
