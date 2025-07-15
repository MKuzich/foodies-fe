import Container from "../../components/Container/Container";
import PopularRecipes from "../../components/PopularRecipes/PopularRecipes";
import RecipeInfo from "../../components/RecipeInfo/RecipeInfo";

const RecipePage = () => {
  return (
    <Container>
      <RecipeInfo />
      <PopularRecipes />
    </Container>
  );
};

export default RecipePage;
