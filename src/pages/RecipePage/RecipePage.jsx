import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeMainInfo from "./RecipeMainInfo";
import RecipeIngredients from "./RecipeIngredients";
import RecipePreparation from "./RecipePreparation";
import styles from "./recipeInfo.module.css";

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/api/recipes/${id}`);
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error("Failed to fetch recipe:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleToggleFavorite = async () => {
    if (!recipe) return;

    const url = `/api/recipes/${id}/${
      recipe.isFavorite ? "remove-favorite" : "add-favorite"
    }`;

    try {
      await fetch(url, { method: "POST" });
      setRecipe({ ...recipe, isFavorite: !recipe.isFavorite });
    } catch (error) {
      console.error("Error updating favorite status", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div className={styles.recipeInfo}>
      <RecipeMainInfo
        image={recipe.image}
        title={recipe.title}
        category={recipe.category}
        description={recipe.description}
        author={recipe.author}
      />

      <RecipeIngredients ingredients={recipe.ingredients} />

      <RecipePreparation
        description={recipe.instructions}
        isFavorite={recipe.isFavorite}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
};

export default RecipePage;
