import { useDispatch, useSelector } from "react-redux";
import CategoriesItem from "../CategoriesItem/CategoriesItem";
import styles from "./CategoriesList.module.css";
import { categoriesSelector, errorSelector, isLoadingSelector, showAllSelector } from "@/redux/categories/selectors";
import { toggleShowAll } from "@/redux/categories/slice";
import { useScreenWidth } from "@/hooks/useScreenWidth";
import Loader from "../Loader/Loader";

function CategoriesList() {
    const categories = useSelector(categoriesSelector);
    const isLoading = useSelector(isLoadingSelector);
    const error = useSelector(errorSelector);
    const showAll = useSelector(showAllSelector);
    const dispatch = useDispatch();

    const width = useScreenWidth();
    const displayedCategories = showAll ? categories : categories.slice(0, width < 768 ? 6 : 11); 



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
