import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addFavoriteRecipe, removeFavoriteRecipe } from "@/redux/recipes/actions";
import { favoriteRecipesSelector } from "@/redux/recipes/selectors";

import AvatarIcon from "../AvatarIcon/AvatarIcon";
import IconButton from "../IconButton/IconButton";
import styles from "./RecipeCard.module.css";

function RecipeCard({ recipe }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favoriteRecipes = useSelector(favoriteRecipesSelector);
  const [isFavorite, setIsFavorite] = useState(
    favoriteRecipes?.some((fav) => fav.id === recipe.id) || false,
  );

  const handleGetRecipe = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  const handleClickFavorite = async (e) => {
    const btn = e.currentTarget;
    btn.disabled = true;
    if (isFavorite) {
      await dispatch(removeFavoriteRecipe(recipe.id));
    } else {
      await dispatch(addFavoriteRecipe(recipe.id));
    }
    btn.disabled = false;
    setIsFavorite((prev) => !prev);
  };

  return (
    <li className={styles.recipeItem}>
      <img src={recipe.thumb} alt="recipe" className={styles.recipeImage} />
      <h3 className={styles.recipeTitle}>{recipe.title}</h3>
      <p className={styles.recipeDescription}>{recipe.description}</p>
      <div className={styles.recipeInfo}>
        <div className={styles.recipeAvatarWrapper}>
          <AvatarIcon
            name={recipe.owner.name}
            avatarUrl={recipe.owner.avatarUrl}
            alt={`${recipe.owner.name} avatar`}
            xsmall
            to={`/user/${recipe.owner.id}`}
          />
          <p className={styles.recipeAvatarName}>{recipe.owner.name}</p>
        </div>
        <div className={styles.recipeIconsWrapper}>
          {/* TODO: correct styles size for tablet and desktop */}
          <IconButton
            name="like"
            iconStyle={isFavorite ? { fill: "red", stroke: "red" } : {}}
            onClick={handleClickFavorite}
          />
          <IconButton name="arrowUpRight" onClick={handleGetRecipe} />
        </div>
      </div>
    </li>
  );
}

export default RecipeCard;
