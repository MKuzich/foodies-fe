import { useSelector } from "react-redux";
import CategoriesItem from "../CategoriesItem/CategoriesItem";
import styles from "./CategoriesList.module.css";
import { categoriesSelector, errorSelector, isLoadingSelector } from "../../redux/categories/selectors";
import { useState } from "react";
import { useScreenWidth } from "../../hooks/useScreenWidth";

function CategoriesList() {
    const categories = useSelector(categoriesSelector);
    const isLoading = useSelector(isLoadingSelector);
    const error = useSelector(errorSelector);

    const [showAll, setShowAll] = useState(false);


    const width = useScreenWidth();

    const displayedCategories = showAll ? categories : categories.slice(0, width < 768 ? 6 : 11); 


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleShowAll = () => {
        setShowAll(!showAll);
    }

    return (
        <ul className={styles.categoriesList}>
            {displayedCategories.map((item, index) => (
                <CategoriesItem key={index} id={item.id} title={item.name} />
            ))}
            <CategoriesItem option="All" title={showAll ? "Hide categories" : "All categories"} onClick={handleShowAll} />
            {showAll && <CategoriesItem option="Show" title="All recipes" />}
        </ul>
    );
}

export default CategoriesList;