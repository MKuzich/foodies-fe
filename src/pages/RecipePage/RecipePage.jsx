import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Container from "@/components/Container/Container";
import PathInfo from "@/components/PathInfo/PathInfo";
import PopularRecipes from "@/components/PopularRecipes/PopularRecipes";
import RecipeInfo from "@/components/RecipeInfo/RecipeInfo";
import RecipeTestimonials from "@/components/RecipeTestimonials/RecipeTestimonials";

import api from "../../api";
import Meta from "../../components/Meta/Meta";
import styles from "./RecipePage.module.css";

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchRecipe = async () => {
      try {
        const { data } = await api.axios.get(`recipes/${id}`);
        setRecipe(data);
      } catch (error) {
        console.error("Failed to fetch recipe:", error);
      } finally {
        setLoading(false);
      }
    };
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchRecipe();
  }, [id]);

  return (
    <>
      <Meta
        title={recipe?.title ?? "Recipe"}
        description={recipe?.description ?? "Delicious recipe details."}
        {...(recipe?.thumb ? { image: recipe.thumb } : {})}
      />
      <PathInfo name={recipe?.title ?? "Recipe"} />
      <section className={styles.recipeInfo}>
        <Container>
          <RecipeInfo recipe={recipe} loading={loading} />
        </Container>
      </section>
      <section>
        <Container>{recipe && <PopularRecipes currentRecipeId={recipe.id} />}</Container>
      </section>
      <section>
        <Container>
          <RecipeTestimonials />
        </Container>
      </section>
    </>
  );
};

export default RecipePage;
