import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import {
  errorSelector,
  isLoadingSelector,
  popularRecipesSelector,
} from "../../redux/recipes/selectors";
import { fetchPopularRecipes } from "../../redux/recipes/slice";
import Loader from "../Loader/Loader";
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

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <div>
      <h2 className={styles.popularRecipesTitle}>Popular Recipes</h2>
      {loading && <Loader />}
      {!loading && (
        <ul className={styles.popularRecipesList}>
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default PopularRecipes;
