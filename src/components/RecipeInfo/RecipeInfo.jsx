import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../api/api";
import Loader from "../../components/Loader/Loader";
import RecipeMainInfo from "../../components/RecipeMainInfo/RecipeMainInfo";

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const { data } = await api.get(`recipes/${id}`);
        setRecipe(data);
      } catch (error) {
        console.error("Failed to fetch recipe:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (!recipe) return <div>Recipe not found</div>;

  return <RecipeMainInfo recipe={recipe} />;
};

export default RecipePage;
