import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Categories from "@/components/Categories/Categories";
import Container from "@/components/Container/Container";
import Hero from "@/components/Hero/Hero";
import Meta from "@/components/Meta/Meta";
import Recipes from "@/components/Recipes/Recipes";
import Testimonials from "@/components/Testimonials/Testimonials";
import { useCategoriesAreasIngredientsFetch } from "@/hooks/useCategoriesAreasIngredientsFetch";

import styles from "./HomePage.module.css";

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const [isSearchParams, setIsSearchParams] = useState(false);

  useCategoriesAreasIngredientsFetch();

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());

    if (Object.keys(params).length === 0) {
      setIsSearchParams(false);
    } else {
      setIsSearchParams(true);
    }
  }, [searchParams]);

  return (
    <>
      <Meta
        title="Categories"
        description="Explore a variety of delicious recipes across different categories."
      />
      <div>
        <Hero />
        <Container>
          {isSearchParams ? (
            <Recipes />
          ) : (
            <>
              <Categories />
            </>
          )}
          <div className={styles.testimonialsWrapper}>
            <Testimonials />
          </div>
        </Container>
      </div>
    </>
  );
};

export default HomePage;
