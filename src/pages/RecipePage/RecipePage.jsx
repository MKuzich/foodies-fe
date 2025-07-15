import Container from "../../components/Container/Container";
import PopularRecipes from "../../components/PopularRecipes/PopularRecipes";
import RecipeInfo from "../../components/RecipeInfo/RecipeInfo";
import styles from "./RecipePage.module.css";
const RecipePage = () => {
  return (
    <>
      <section className={styles.recipeInfo}>
        <Container>
          <RecipeInfo />
        </Container>
      </section>
      <section>
        <Container>
          <PopularRecipes />
        </Container>
      </section>
    </>
  );
};

export default RecipePage;
