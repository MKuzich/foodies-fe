import React from "react";

import AddRecipeForm from "../../components/AddRecipeForm/AddRecipeForm";
import Container from "../../components/Container/Container";
import MainTitle from "../../components/MainTitle/MainTitle";
import PathInfo from "../../components/PathInfo/PathInfo";
import Subtitle from "../../components/Subtitle/Subtitle";

const AddRecipePage = () => {
  return (
    <>
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
