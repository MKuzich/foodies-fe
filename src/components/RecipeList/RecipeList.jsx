import styles from "./RecipeList.module.css";
import RecipeCard from "../RecipeCard/RecipeCard";
import { useDispatch, useSelector } from "react-redux";
import { recipesSelector } from "@/redux/recipes/selectors";
import { useEffect } from "react";
import { fetchRecipes } from "../../redux/recipes/actions";

function RecipeList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);


  const recipes = useSelector(recipesSelector);


  return (
    <ul className={styles.recipeList}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </ul>
  );
}

export default RecipeList;