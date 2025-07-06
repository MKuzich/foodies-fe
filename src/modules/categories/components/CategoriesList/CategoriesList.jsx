import CategoriesItem from "../CategoriesItem/CategoriesItem";
import styles from "./CategoriesList.module.css";

function CategoriesList() {
    return (
        <ul className={styles.categoriesList}>
            <CategoriesItem />
            <CategoriesItem />
            <CategoriesItem />
            <CategoriesItem />
            <CategoriesItem />
            <CategoriesItem />
            <CategoriesItem />
            <CategoriesItem />
            <CategoriesItem />
            <CategoriesItem />
            <CategoriesItem />
            <CategoriesItem option="all" />
        </ul>
    );
}

export default CategoriesList;