import React, { useState } from "react";
import Button from "@/components/Button/Button";
import Container from "@/components/Container/Container";
import Hero from "@/components/Hero/Hero";
import Categories from "@/components/Categories/Categories";
import Testimonials from "@/components/Testimonials/Testimonials";
import Recipes from "@/components/Recipes/Recipes";
import { selectedCategory } from "../../redux/categories/selectors";
import { useSelector } from "react-redux";
import IconButton from "@/components/IconButton/IconButton";

const HomePage = () => {
  const isSelectedCategory = useSelector(selectedCategory);

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
          <Button onClick={() => console.log("Button clicked!")}>
            Default Button
          </Button>
          <Button
            outlined={true}
            onClick={() => console.log("Button clicked!")}
          >
            Outlined Button
          </Button>
          <Button
            onClick={() => console.log("Button clicked!")}
            type="submit"
            inactive
          >
            Inactive button
          </Button>
        </div>
        <h2>Example of using IconButton component in different variants</h2>
        <div style={{ display: "flex", gap: "2rem", alignItems: "start" }}>
          <IconButton name="trash" disabled />
          <IconButton
            name="like"
            onClick={() => console.log("Like Button clicked!")}
          />
          <IconButton name="plus" />
          <IconButton name="minus" />
        </div>
        {isSelectedCategory ? (
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
