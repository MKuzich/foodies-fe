import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Container from "@/components/Container/Container";
import Pagination from "@/components/Pagination/Pagination";
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
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;

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

  const fetchTestimonials = async () => {
    try {
      const response = await api.testimonials.fetchTestimonialsByRecipeId({
        recipeId: id,
        page: currentPage,
        limit,
      });
      setTestimonials(response.data);
      setTotalPages(response.pagination.pages);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchTestimonials();
  }, [id, currentPage]);

  const handleAddTestimonial = () => {
    setLoading(true);
    fetchTestimonials();
  };

  const handleDeleteTestimonial = () => {
    setLoading(true);
    fetchTestimonials();
  };

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
          <RecipeInfo
            recipe={recipe}
            loading={loading}
            onChangeTestimonials={handleAddTestimonial}
          />
        </Container>
      </section>
      <section>
        <Container>{recipe && <PopularRecipes currentRecipeId={recipe.id} />}</Container>
      </section>
      <section>
        <Container>
          {!loading && (
            <RecipeTestimonials testimonials={testimonials} onDelete={handleDeleteTestimonial} />
          )}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onClick={setCurrentPage}
                isLoading={loading}
              />
            </div>
          )}
        </Container>
      </section>
    </>
  );
};

export default RecipePage;
