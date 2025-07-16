import { useNavigate } from "react-router-dom";

import AvatarIcon from "../AvatarIcon/AvatarIcon";
import IconButton from "../IconButton/IconButton";
import styles from "./RecipeCard.module.css";

function RecipeCard({ recipe }) {
  const navigate = useNavigate();

  const handleGetRecipe = () => {
    navigate(`/recipe/${recipe.id}`);
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
          <IconButton name="like" />
          <IconButton name="arrowUpRight" onClick={handleGetRecipe} />
        </div>
      </div>
    </li>
  );
}

export default RecipeCard;
