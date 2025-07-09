import css from "./RecipePreview.module.css";
import { Link } from "react-router-dom";
import IconButton from "../IconButton/IconButton";
import IconLink from "../IconLink/IconLink";

const RecipePreview = ({ recipe }) => {
  return (
    <li className={css.recipePreview}>
      <img
        src={recipe.thumb}
        alt={recipe.title}
        className={css.recipePreviewImage}
      />
      <div className={css.recipePreviewWrapper}>
        <div className={css.recipePreviewInfo}>
          {/* add as typography with variant="h2" UserCard has the same */}

          <h2 className={css.recipePreviewTitle}>{recipe.title}</h2>
          <p className={css.recipePreviewDescription}>{recipe.description}</p>
        </div>
        <div className={css.recipePreviewButtons}>
          <IconLink to={`/recipe/${recipe.id}`} name="arrow" />
          <IconButton></IconButton>
        </div>
      </div>
    </li>
  );
};

export default RecipePreview;
