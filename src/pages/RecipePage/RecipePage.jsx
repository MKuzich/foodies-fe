import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Container from "../../components/Container/Container";
// import RecipePreparation from "../components/RecipePreparation";
// import PopularRecipes from "../../components/PopularRecipes/PopularRecipes";
import Loader from "../../components/Loader/Loader";
import RecipeMainInfo from "../../components/RecipeMainInfo/RecipeMainInfo";

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

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (!recipe) return <div>Recipe not found</div>;

  return (
    <Container>
      <RecipeMainInfo recipe={recipe} />
      {/* <PopularRecipes /> */}
    </Container>
  );
};

export default RecipePage;
