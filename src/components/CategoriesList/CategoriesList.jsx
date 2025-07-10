import { useDispatch, useSelector } from "react-redux";
import CategoriesItem from "../CategoriesItem/CategoriesItem";
import styles from "./CategoriesList.module.css";
import { categoriesSelector, errorSelector, isLoadingSelector } from "../../redux/categories/selectors";
import { fetchCategories } from "../../redux/categories/actions";
import { useEffect } from "react";

function CategoriesList() {
    const categories = useSelector(categoriesSelector);
    const isLoading = useSelector(isLoadingSelector);
    const error = useSelector(errorSelector);


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);



    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <ul className={styles.categoriesList}>
            {categories.map((item) => (
                <CategoriesItem key={item.id} id={item.id} title={item.name}  />
            ))}
            <CategoriesItem option="all" title="All categories" />
        </ul>
    );
}

export default CategoriesList;