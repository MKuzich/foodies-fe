import styles from "./Categories.module.css";
import CategoriesList from "../CategoriesList/CategoriesList";
import MainTitle from "@/components/MainTitle/MainTitle";
import Subtitle from "@/components/Subtitle/Subtitle";

function Categories() {
    return (
        <div className={styles.categoriesContainer}>
            <MainTitle>Categories</MainTitle>
            <Subtitle style={{ maxWidth: "540px" }}>
                Discover a limitless world of culinary possibilities and enjoy exquisite recipes that combine taste, style and the warm atmosphere of the kitchen.
            </Subtitle>
            <CategoriesList />
        </div>
    );
}

export default Categories;