import { useState } from "react";
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
  const [error, setError] = useState(null);

  const handleFavoriteToggle = async () => {
    if (!isLoggedIn) {
      dispatch(openSignIn());
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (isFavorite) {
        await api.delete(`recipes/${recipe.id}/favorite`);
        setIsFavorite(false);
      } else {
        await api.post(`recipes/${recipe.id}/favorite`);
        setIsFavorite(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3 className={styles.itemTitle}>Recipe Preparation</h3>
      <p className={styles.description}>{recipe.instructions}</p>

      <div className={styles.favoriteBtn}>
        <Button
          outlinedInactive={isFavorite}
          onClick={handleFavoriteToggle}
          disabled={loading}
          type="button"
        >
          {isFavorite ? "Remove from favorites" : "Add to favorites"}
        </Button>
        {error && <p className={styles.error}>{error}</p>}
      </div>
      <div className={styles.testimonialBtn}>
        <TestimonialModal recipeId={recipe.id} onChangeTestimonials={onChangeTestimonials} />
      </div>
    </>
  );
};

export default RecipePreparation;
