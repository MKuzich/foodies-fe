import clsx from "clsx";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchFavoriteRecipes } from "../../redux/recipes/actions";
import { removeFromFavoriteRecipe, removeRecipe } from "../../redux/users/operations";
import { selectIsUserCurrentUser, selectTabOpened } from "../../redux/users/selectors";
import IconButton from "../IconButton/IconButton";
import IconLink from "../IconLink/IconLink";
import css from "./RecipePreview.module.css";

const RecipePreview = ({ recipe }) => {
  const isCurrentUser = useSelector(selectIsUserCurrentUser);
  const dispatch = useDispatch();
  const tabOpened = useSelector(selectTabOpened);

  const handleRemoveRecipe = async (e) => {
    const btn = e.currentTarget;
    btn.disabled = true;

    if (tabOpened === "favorites") {
      const result = await dispatch(removeFromFavoriteRecipe(recipe.id));
      if (removeFromFavoriteRecipe.fulfilled.match(result)) {
        toast.success("Successfully removed recipe from favorites!");
        // TODO: if we have time should recheck this and rewrite it
        dispatch(fetchFavoriteRecipes());
      } else {
        toast.error(result.payload.message || "Failed to remove recipe from favorites");
      }
    } else {
      const result = await dispatch(removeRecipe(recipe.id));
      if (removeRecipe.fulfilled.match(result)) {
        toast.success("Successfully removed recipe!");
      } else {
        toast.error(result.payload.message || "Failed to remove recipe");
      }
    }

    btn.disabled = false;
  };

  return (
    <li className={css.recipePreview}>
      <Link to={`/recipe/${recipe.id}`} className={clsx(css.link, css.linkImage)}>
        <img
          loading="lazy"
          src={recipe.thumb}
          alt={recipe.title}
          className={css.recipePreviewImage}
        />
      </Link>
      <div className={css.recipePreviewWrapper}>
        <div className={css.recipePreviewInfo}>
          <Link to={`/recipe/${recipe.id}`} className={clsx(css.link, css.linkTitle)}>
            <h2 className={css.recipePreviewTitle}>{recipe.title}</h2>
          </Link>
          <p className={css.recipePreviewDescription}>{recipe.description}</p>
        </div>
        <div className={css.recipePreviewButtons}>
          <IconLink
            to={`/recipe/${recipe.id}`}
            name="arrow"
            black
            className={clsx(css.link, css.linkIcon)}
          />
          {isCurrentUser && <IconButton name="trash" onClick={handleRemoveRecipe} />}
        </div>
      </div>
    </li>
  );
};

export default RecipePreview;
