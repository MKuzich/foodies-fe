import RecipeFilters from "../RecipeFilters/RecipeFilters";
import RecipeList from "../RecipeList/RecipeList";
import styles from "./Recipes.module.css";
import MainTitle from "@/components/MainTitle/MainTitle";
import Subtitle from "@/components/Subtitle/Subtitle";
import { useDispatch, useSelector } from "react-redux";
import { selectedCategory } from "../../redux/categories/selectors";
import { setSelectedCategory } from "../../redux/categories/slice";

function Recipes() {
    const isSelectedCategory = useSelector(selectedCategory);
    const dispatch = useDispatch();

    const handleBack = () => {
        dispatch(setSelectedCategory(null));
    }

    return (
        <div className={styles.recipesContainer}>
            <div className={styles.recipesBackContainer} onClick={handleBack}>
                <svg className={styles.recipesBackIcon}>
                    <use href="/src/assets/sprite.svg#icon-arrow-left" />
                </svg>
                <p className={styles.recipesBackText}>Back</p>
            </div>
            <MainTitle>{isSelectedCategory.title}</MainTitle>
            <Subtitle style={{ maxWidth: "540px" }}>Go on a taste journey, where every sip is a sophisticated creative chord, and every dessert is an expression of the most refined gastronomic desires.</Subtitle>
            <div className={styles.recipesContent}>
                <RecipeFilters />
                <RecipeList />
            </div>
        </div>
    );
}

export default Recipes;