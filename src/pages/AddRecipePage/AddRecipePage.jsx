import React from "react";
import Container from "../../components/Container/Container";
import MainTitle from "../../components/MainTitle/MainTitle";
import Subtitle from "../../components/Subtitle/Subtitle";
import PathInfo from "../../components/PathInfo/PathInfo";
import AddRecipeForm from "../../components/AddRecipeForm/AddRecipeForm";

const AddRecipePage = () => {
  return (
    <Container>
      <PathInfo pathName={"home"} currentName={"Add recipe"} />
      <MainTitle>Add recipe</MainTitle>
      <Subtitle style={{ maxWidth: "443px" }}>
        Reveal your culinary art, share your favorite recipe and create
        gastronomic masterpieces with us.
      </Subtitle>
      <AddRecipeForm />
    </Container>
  );
};

export default AddRecipePage;
