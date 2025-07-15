import styles from "./RecipeList.module.css";
import RecipeCard from "../RecipeCard/RecipeCard";
import { useSelector } from "react-redux";
import { recipesSelector, isLoadingSelector, errorSelector } from "@/redux/recipes/selectors";
import Loader from "../Loader/Loader";
import { useRef, useState, useEffect } from "react";

function RecipeList() {
  const recipes = useSelector(recipesSelector);
  const isLoading = useSelector(isLoadingSelector);
  const error = useSelector(errorSelector);
  const recipesHeight = useRef(null);
  const [containerHeight, setContainerHeight] = useState(400); // Минимальная высота

  // Обновляем высоту когда компонент монтируется или рецепты загружаются
  useEffect(() => {
    if (recipesHeight.current) {
      setContainerHeight(recipesHeight.current.offsetHeight);
    }
  }, [recipes]);

  if (recipes.length === 0 && !isLoading && !error) {
    return (
      <div className={styles.recipeListEmpty}>
        <h3 className={styles.recipeListTitle}>Oops! We couldn't find any recipes. Please try again.</h3>
      </div>
    )
  }
 
  if (isLoading) {
    return (
      <div style={{ minHeight: containerHeight, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Loader height={containerHeight} />
      </div>
    );
  }
 
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ul className={styles.recipeList} ref={recipesHeight}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </ul>
  );
}

export default RecipeList;