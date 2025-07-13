import RecipeFilters from "../RecipeFilters/RecipeFilters";
import RecipeList from "../RecipeList/RecipeList";
import styles from "./Recipes.module.css";
import MainTitle from "@/components/MainTitle/MainTitle";
import Subtitle from "@/components/Subtitle/Subtitle";
import { useDispatch, useSelector } from "react-redux";
import { selectedCategory } from "../../redux/categories/selectors";
import { setSelectedCategory } from "../../redux/categories/slice";
import { useEffect, useRef } from "react";
import Icons from "../../assets/sprite.svg";
import RecipePagination from "../RecipePagination/RecipePagination";

function Recipes() {
    const isSelectedCategory = useSelector(selectedCategory);
    const recipesRef = useRef(null);

    const dispatch = useDispatch();

    useEffect(() => {
        if (recipesRef.current) {
            recipesRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    const handleBack = () => {
        dispatch(setSelectedCategory(null));
    }

    return (
        <div className={styles.recipesContainer} ref={recipesRef}>
            <div className={styles.recipesBackContainer} onClick={handleBack}>
                <button className={styles.recipesBackButton}>
                    <svg className={styles.recipesBackIcon}>
                        <use href={`${Icons}#icon-arrow-left`} />
                    </svg>
                    <p className={styles.recipesBackText}>Back</p>
                </button>
            </div>
            <MainTitle>{isSelectedCategory.title}</MainTitle>
            <Subtitle style={{ maxWidth: "540px" }}>{isSelectedCategory.description}</Subtitle>
            <div className={styles.recipesContent}>
                <RecipeFilters />
                <div>
                    <RecipeList />
                    <RecipePagination currentPage={1} lastPage={3} />
                </div>
            </div>
        </div>
    );
}

export default Recipes;