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

    try {
      if (isFavorite) {
        await api.delete(`recipes/${recipe.id}/favorite`);
        setIsFavorite(false);
      } else {
        await api.post(`recipes/${recipe.id}/favorite`);
        setIsFavorite(true);
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
        <li className={styles.buttonList}>
          <Button outlinedInactive={true} onClick={handleFavoriteToggle}>
            {!isLoggedIn || !isFavorite ? "Add to favorites" : "Remove from favorites"}
          </Button>
        </li>
        <li className={styles.buttonList}>
          <TestimonialModal recipeId={recipe.id} onChangeTestimonials={onChangeTestimonials} />
        </li>
      </ul>
    </>
  );
};

export default RecipePreparation;
