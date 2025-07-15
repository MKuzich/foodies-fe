import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import AvatarIcon from "@/components/AvatarIcon/AvatarIcon";
import Button from "@/components/Button/Button";
import Categories from "@/components/Categories/Categories";
import Container from "@/components/Container/Container";
import Hero from "@/components/Hero/Hero";
import IconButton from "@/components/IconButton/IconButton";
import Recipes from "@/components/Recipes/Recipes";
import TestimonialModal from "@/components/TestimonialModal";
import Testimonials from "@/components/Testimonials/Testimonials";
// import { selectedCategory } from "../../redux/categories/selectors";
// import { setQuery } from "../../redux/recipes/slice";

const HomePage = () => {
  const [
    searchParams,
    // setSearchParams
  ] = useSearchParams();
  const [isSearchParams, setIsSearchParams] = useState(false);

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
      <nav>
        <TestimonialModal recipeId={6} />
      </nav>
      {/* TODO: Delete example below, just show-case of using Button */}
      <Container>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              alignItems: "start",
            }}
          >
            <h2>Example of using Button component in different variants</h2>
            <Button onClick={() => console.log("Button clicked!")}>Default Button</Button>
            <Button outlined={true} onClick={() => console.log("Button clicked!")}>
              Outlined Button
            </Button>
            <Button onClick={() => console.log("Button clicked!")} type="submit" inactive>
              Inactive button
            </Button>
          </div>
          <h2>Example of using IconButton component in different variants</h2>
          <div style={{ display: "flex", gap: "2rem", alignItems: "start" }}>
            <IconButton name="trash" disabled />
            <IconButton name="like" onClick={() => console.log("Like Button clicked!")} />
            <IconButton name="plus" />
            <IconButton name="minus" />
          </div>

          <h2>Example of using AvatarIcon component in different variants</h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "2rem",
              alignItems: "start",
            }}
          >
            <ul>
              <li style={{ display: "flex", gap: "2rem" }}>
                Large 80x80 mobile 120x120 other
                <AvatarIcon name="Goit" large />
                <AvatarIcon src="https://placehold.co/400" large />
              </li>
              <li style={{ display: "flex", gap: "2rem" }}>
                Medium 60x60 mobile 85x85 other
                <AvatarIcon name="Nick" medium />
                <AvatarIcon src="https://placehold.co/400" medium />
              </li>
              <li style={{ display: "flex", gap: "2rem" }}>
                Small 32x32 mobile 50x50 other
                <AvatarIcon small />
                <AvatarIcon src="https://placehold.co/400" small />
              </li>
              <li style={{ display: "flex", gap: "2rem" }}>
                XSmall 32x32 mobile 40x40 other
                <AvatarIcon name="John" xsmall />
                <AvatarIcon src="https://placehold.co/400" xsmall />
              </li>
            </ul>
          </div>
        </div>
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
