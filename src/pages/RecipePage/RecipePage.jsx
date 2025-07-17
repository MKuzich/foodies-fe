import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Container from "@/components/Container/Container";
import PathInfo from "@/components/PathInfo/PathInfo";
import PopularRecipes from "@/components/PopularRecipes/PopularRecipes";
import RecipeInfo from "@/components/RecipeInfo/RecipeInfo";
import RecipeTestimonials from "@/components/RecipeTestimonials/RecipeTestimonials";

import api from "../../api";
import { selectUserInfo } from "../../redux/auth/slice";
import styles from "./RecipePage.module.css";

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectUserInfo);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const params = {
          params: {
            userId: user && user.id ? user.id : null,
          },
        };
        const { data } = await api.axios.get(`recipes/${id}`, params);
        setRecipe(data);
      } catch (error) {
        console.error("Failed to fetch recipe:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTestimonials = async () => {
      try {
        const response = await api.testimonials.fetchTestimonialsByRecipeId({ recipeId: id });
        setTestimonials(response);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();

    fetchRecipe();
  }, [id, user]);

  const handleChangeTestimonials = (newTestimonial) => {
    const prevTestimonials = testimonials.slice(0, -1);
    setTestimonials([newTestimonial, ...prevTestimonials]);
  };

  return (
    <>
      <PathInfo name={recipe?.title ?? "Recipe"} />
      <section className={styles.recipeInfo}>
        <Container>
          <RecipeInfo
            recipe={recipe}
            loading={loading}
            onChangeTestimonials={handleChangeTestimonials}
          />
        </Container>
      </section>
      <section>
        <Container>
          <PopularRecipes />
        </Container>
      </section>
      <section>
        <Container>
          <RecipeTestimonials testimonials={testimonials} />
        </Container>
      </section>
    </>
  );
};

export default RecipePage;
