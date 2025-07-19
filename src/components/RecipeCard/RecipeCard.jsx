import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { openSignIn } from "@/redux/auth/slice";
import { addFavoriteRecipe, removeFavoriteRecipe } from "@/redux/recipes/actions";
import { favoriteRecipesSelector } from "@/redux/recipes/selectors";

import AvatarIcon from "../AvatarIcon/AvatarIcon";
import IconButton from "../IconButton/IconButton";
import skeletonStyles from "../Skeleton/Skeleton.module.css";
import styles from "./RecipeCard.module.css";

export const SkeletonCard = () => {
  return (
    <li className={styles.recipeItem}>
      <div className={`${styles.recipeImage} ${skeletonStyles.skeleton}`}></div>

      <div
        className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonTitle}`}
        style={{ marginTop: "16px", marginBottom: "8px" }}
      ></div>

      <div
        className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonDescription}`}
        style={{ marginBottom: "16px" }}
      ></div>

      <div className={styles.recipeInfo}>
        <div className={styles.recipeAvatarWrapper}>
          <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonTinyText}`}></div>
        </div>
      </div>
    </li>
  );
};

function RecipeCard({ recipe }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();

  const favoriteRecipes = useSelector(favoriteRecipesSelector);

  const [isFavorite, setIsFavorite] = useState(
    favoriteRecipes?.some((fav) => fav.id === recipe.id) || false,
  );

  useEffect(() => {
    setIsFavorite(favoriteRecipes?.some((fav) => fav.id === recipe.id) || false);
  }, [favoriteRecipes, recipe.id]);

  const handleGetRecipe = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  const handleClickFavorite = async (e) => {
    const btn = e.currentTarget;
    btn.disabled = true;
    if (user) {
      if (isFavorite) {
        await dispatch(removeFavoriteRecipe(recipe.id));
      } else {
        await dispatch(addFavoriteRecipe(recipe));
      }
    } else {
      dispatch(openSignIn());
    }
    btn.disabled = false;
  };

  return (
    <li className={styles.recipeItem}>
      <img loading="lazy" src={recipe.thumb} alt="recipe" className={styles.recipeImage} />
      <h3 className={styles.recipeTitle}>{recipe.title}</h3>
      <p className={styles.recipeDescription}>{recipe.description}</p>
      <div className={styles.recipeInfo}>
        <div className={styles.recipeAvatarWrapper}>
          <AvatarIcon
            name={recipe.owner.name}
            src={recipe.owner.avatarURL}
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
