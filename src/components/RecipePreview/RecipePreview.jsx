import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { removeFromFavoriteRecipe, removeRecipe } from "../../redux/users/operations";
import { selectIsUserCurrentUser } from "../../redux/users/selectors";
import IconButton from "../IconButton/IconButton";
import IconLink from "../IconLink/IconLink";
import css from "./RecipePreview.module.css";

const RecipePreview = ({ recipe, favorite }) => {
  const isCurrentUser = useSelector(selectIsUserCurrentUser);
  const dispatch = useDispatch();

  const handleRemoveRecipe = async () => {
    if (favorite) {
      const result = await dispatch(removeFromFavoriteRecipe(recipe.id));
      if (removeFromFavoriteRecipe.fulfilled.match(result)) {
        toast.success("Successfully removed recipe from favorites!");
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
  };

  return (
    <li className={css.recipePreview}>
      <img src={recipe.thumb} alt={recipe.title} className={css.recipePreviewImage} />
      <div className={css.recipePreviewWrapper}>
        <div className={css.recipePreviewInfo}>
          {/* add as typography with variant="h2" UserCard has the same */}

          <h2 className={css.recipePreviewTitle}>{recipe.title}</h2>
          <p className={css.recipePreviewDescription}>{recipe.description}</p>
        </div>
        <div className={css.recipePreviewButtons}>
          <IconLink to={`/recipe/${recipe.id}`} name="arrow" black />
          {isCurrentUser && <IconButton name="trash" onClick={handleRemoveRecipe} />}
        </div>
      </div>
    </li>
  );
};

export default RecipePreview;
