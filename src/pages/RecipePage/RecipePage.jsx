import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Container from "@/components/Container/Container";
import PathInfo from "@/components/PathInfo/PathInfo";
import PopularRecipes from "@/components/PopularRecipes/PopularRecipes";
import RecipeInfo from "@/components/RecipeInfo/RecipeInfo";
import RecipeTestimonials from "@/components/RecipeTestimonials/RecipeTestimonials";

import api from "../../api/api";
import styles from "./RecipePage.module.css";
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
  return (
    <>
      <PathInfo name={recipe?.title ?? "Recipe"} />
      <section className={styles.recipeInfo}>
        <Container>
          <RecipeInfo recipe={recipe} loading={loading} />
        </Container>
      </section>
      <section>
        <Container>
          <PopularRecipes />
        </Container>
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
