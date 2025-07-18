import React from "react";

import AddRecipeForm from "../../components/AddRecipeForm/AddRecipeForm";
import Container from "../../components/Container/Container";
import MainTitle from "../../components/MainTitle/MainTitle";
import Meta from "../../components/Meta/Meta";
import PathInfo from "../../components/PathInfo/PathInfo";
import Subtitle from "../../components/Subtitle/Subtitle";

const AddRecipePage = () => {
  return (
    <>
      <Meta
        title="Add Recipe"
        description="Share your culinary creations with the world by adding your own recipe."
      />
      <PathInfo name={"Add recipe"} />
      <section>
        <Container>
          <MainTitle>Add recipe</MainTitle>
          <Subtitle style={{ maxWidth: "443px" }}>
            Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces
            with us.
          </Subtitle>
          <AddRecipeForm />
        </Container>
      </section>
    </>
  );
};

export default AddRecipePage;
