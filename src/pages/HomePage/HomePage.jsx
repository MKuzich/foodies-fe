import React, { useState } from "react";
import Button from "@/components/Button/Button";
import Container from "@/components/Container/Container";
import Hero from "@/components/Hero/Hero";
import Categories from "@/components/Categories/Categories";
import Testimonials from "@/components/Testimonials/Testimonials";
import Recipes from "@/components/Recipes/Recipes";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  // TEMPORARY FROM TESTING
  const [isCategoreis, setIsCategoreis] = useState(true);
  return (
    <div>
      <Hero />
      {/* TODO: Delete example below, just show-case of using Button */}
      <Container>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          <h2>Example of using Button component in different variants</h2>
          <Button onCLick={() => console.log("Button clicked!")}>
            Default Button
          </Button>
          <Button
            outlined={true}
            onCLick={() => console.log("Button clicked!")}
          >
            Outlined Button
          </Button>
          <Button
            onCLick={() => console.log("Button clicked!")}
            type="submit"
            inactive
          >
            Inactive button
          </Button>

          {/* TEMPORARY FROM TESTING */}
          <Button
            outlined={true}
            onClick={() => setIsCategoreis(!isCategoreis)}
          >
           Switch to Recipes and back to Categories
          </Button>
          
        </div>
       
          {isCategoreis ? <>
            <Categories />
            <Testimonials />
          </> : <Recipes />}
      </Container>
    </div>
  );
};

export default HomePage;
