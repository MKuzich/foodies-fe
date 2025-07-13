import IconButton from "../IconButton/IconButton";
import IconLink from "../IconLink/IconLink";

import css from "./RecipePreview.module.css";
import { useSelector } from "react-redux";
import { selectIsUserCurrentUser } from "../../redux/users/selectors";

const RecipePreview = ({ recipe }) => {
  const isCurrentUser = useSelector(selectIsUserCurrentUser);

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
          <IconLink to={`/recipe/${recipe.id}`} name="arrow" black />
          {isCurrentUser && <IconButton name="trash" />}
        </div>
      </div>
    </li>
  );
};

export default RecipePreview;
