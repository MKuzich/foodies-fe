import { useDispatch, useSelector } from "react-redux";

import useMediaQuery from "@/hooks/useMediaQuery";
import {
  categoriesSelector,
  errorCategoriesSelector,
  isLoadingCategoriesSelector,
  showAllSelector,
} from "@/redux/categories/selectors";
import { toggleShowAll } from "@/redux/categories/slice";

import CategoriesItem from "../CategoriesItem/CategoriesItem";
import Loader from "../Loader/Loader";
import styles from "./CategoriesList.module.css";

function CategoriesList() {
  const categories = useSelector(categoriesSelector);
  const isLoading = useSelector(isLoadingCategoriesSelector);
  const error = useSelector(errorCategoriesSelector);
  const showAll = useSelector(showAllSelector);

  const dispatch = useDispatch();

  const isMobile = useMediaQuery("(max-width: 374px)");
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
  };
  return (
    <ul className={styles.categoriesList}>
      {displayedCategories.map((item) => (
        <CategoriesItem
          key={item.id}
          id={item.id}
          name={item.name}
          description={item.description}
        />
      ))}
      <CategoriesItem
        option="All"
        name={showAll ? "Hide categories" : "All categories"}
        onClick={handleShowAll}
      />
      {showAll && <CategoriesItem option="Show" name="All recipes" />}
    </ul>
  );
}

export default CategoriesList;
