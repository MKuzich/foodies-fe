import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Categories from "@/components/Categories/Categories";
import Container from "@/components/Container/Container";
import Hero from "@/components/Hero/Hero";
import Recipes from "@/components/Recipes/Recipes";
import Testimonials from "@/components/Testimonials/Testimonials";
import { useCategoriesAreasIngredientsFetch } from "@/hooks/useCategoriesAreasIngredientsFetch";
import { querySelector } from "@/redux/recipes/selectors";
import { useSelector } from "react-redux";

const HomePage = () => {
  const [
    searchParams,
    // setSearchParams
  ] = useSearchParams();
  const [isSearchParams, setIsSearchParams] = useState(false);
  const query = useSelector(querySelector);
  
  console.log("query", query);
  console.log("searchParams", Object.fromEntries(searchParams.entries()));



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
    <div>
      <Hero />
      <Container>
        {isSearchParams ? (
          <Recipes />
        ) : (
          <>
            <Categories />
            <Testimonials />
          </>
        )}
      </Container>
    </div>
  );
};

export default HomePage;
