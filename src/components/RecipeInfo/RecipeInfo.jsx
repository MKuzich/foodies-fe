import Loader from "../../components/Loader/Loader";
import RecipeMainInfo from "../../components/RecipeMainInfo/RecipeMainInfo";
import css from "./RecipeInfo.module.css";

const RecipeInfo = ({ recipe, loading }) => {
  if (loading)
    return (
      <div className={css.loaderWrapper}>
        <Loader />
      </div>
    );
  if (!recipe) return <div>Recipe not found</div>;

  return <RecipeMainInfo recipe={recipe} />;
};

export default RecipeInfo;
