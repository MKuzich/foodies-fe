import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../components/Button/Button";
import { useAuth } from "../../hooks/useAuth";
import { openSignIn, selectCurrentUser } from "../../redux/auth/slice";
import { addFavoriteRecipe, removeFavoriteRecipe } from "../../redux/recipes/actions";
import { favoriteRecipesSelector } from "../../redux/recipes/selectors";
import TestimonialModal from "../TestimonialModal";
import styles from "./RecipePreparation.module.css";

const RecipePreparation = ({ recipe, onChangeTestimonials }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectCurrentUser);
  const favoriteRecipes = useSelector(favoriteRecipesSelector);
  const { auth } = useAuth();
  const [isFavorite, setIsFavorite] = useState(
    favoriteRecipes?.some((fav) => fav.id === recipe.id) || false,
  );

  useEffect(() => {
    setIsFavorite(favoriteRecipes?.some((fav) => fav.id === recipe.id) || false);
  }, [favoriteRecipes, recipe.id, auth]);

  const [loading, setLoading] = useState(false);

  const handleFavoriteToggle = async () => {
    if (!isLoggedIn) {
      dispatch(openSignIn());
      return;
    }
    setLoading(true);

    try {
      if (isFavorite) {
        dispatch(removeFavoriteRecipe(recipe.id));
      } else {
        dispatch(addFavoriteRecipe(recipe));
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3 className={styles.itemTitle}>Recipe Preparation</h3>
      <p className={styles.description}>{recipe.instructions}</p>
      <ul className={styles.buttonList}>
        <li>
          <Button outlinedInactive={true} onClick={handleFavoriteToggle} disabled={loading}>
            {!isLoggedIn || !isFavorite ? "Add to favorites" : "Remove from favorites"}
          </Button>
        </li>
        <li>
          <TestimonialModal recipeId={recipe.id} onChangeTestimonials={onChangeTestimonials} />
        </li>
      </ul>
    </>
  );
};

export default RecipePreparation;
