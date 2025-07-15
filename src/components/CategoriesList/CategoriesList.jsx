import { useDispatch, useSelector } from "react-redux";
import CategoriesItem from "../CategoriesItem/CategoriesItem";
import styles from "./CategoriesList.module.css";
import { showAllSelector } from "@/redux/categories/selectors";
import { toggleShowAll } from "@/redux/categories/slice";
import useMediaQuery from "@/hooks/useMediaQuery";
import Loader from "../Loader/Loader";
import { useCategoriesAreasIngredientsFetch } from "@/hooks/useCategoriesAreasIngredientsFetch";

function CategoriesList() {
  const { categories, isLoading, error } = useCategoriesAreasIngredientsFetch();


  
  const showAll = useSelector(showAllSelector);
  const dispatch = useDispatch();

  const isMobile = useMediaQuery("(max-width: 375px)");
  const displayedCategories = showAll ? categories : categories.slice(0, isMobile ? 8 : 11);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleShowAll = () => {
    dispatch(toggleShowAll());
  }
  return (
    <ul className={styles.categoriesList}>
      {displayedCategories.map((item, index) => (
        <CategoriesItem key={item.id} id={item.id} name={item.name} description={item.description} />
      ))}
      <CategoriesItem option="All" name={showAll ? "Hide categories" : "All categories"} onClick={handleShowAll} />
      {showAll && <CategoriesItem option="Show" name="All recipes" />}
    </ul>
  );
}

export default CategoriesList;
