import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import api from "../../api/api";
import Button from "../../components/Button/Button";
import { openSignIn, selectCurrentUser } from "../../redux/auth/slice";
import TestimonialModal from "../TestimonialModal";
import styles from "./RecipePreparation.module.css";

const RecipePreparation = ({ recipe, onChangeTestimonials }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectCurrentUser);

  const [isFavorite, setIsFavorite] = useState(recipe.isFavorite);
  const [loading, setLoading] = useState(false);

  const handleFavoriteToggle = async () => {
    if (!isLoggedIn) {
      dispatch(openSignIn());
      return;
    }
    setLoading(true);

    if (isFavorite) {
      toast.promise(api.delete(`recipes/${recipe.id}/favorite`), {
        loading: "Removing from favorites...",
        success: () => {
          setIsFavorite(false);
          setLoading(false);
          return "Recipe removed from favorites";
        },
        error: () => {
          setLoading(false);
          return "Failed to remove recipe from favorites";
        },
      });
    } else {
      toast.promise(api.post(`recipes/${recipe.id}/favorite`), {
        loading: "Adding to favorites...",
        success: () => {
          setIsFavorite(true);
          setLoading(false);
          return "Recipe added to favorites";
        },
        error: () => {
          setLoading(false);
          return "Failed to add recipe to favorites";
        },
      });
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
