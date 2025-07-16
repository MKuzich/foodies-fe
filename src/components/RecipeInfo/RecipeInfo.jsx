import Loader from "../../components/Loader/Loader";
import RecipeMainInfo from "../../components/RecipeMainInfo/RecipeMainInfo";

const RecipeInfo = ({ recipe, loading }) => {
  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (!recipe) return <div>Recipe not found</div>;

  return <RecipeMainInfo recipe={recipe} />;
};

export default RecipeInfo;
