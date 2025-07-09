import RecipeFilters from "../RecipeFilters/RecipeFilters";
import RecipeList from "../RecipeList/RecipeList";
import styles from "./Recipes.module.css";
import MainTitle from "@/components/MainTitle/MainTitle";
import Subtitle from "@/components/Subtitle/Subtitle";

function Recipes() {
    return (
        <div className={styles.recipesContainer}>
            <MainTitle>DESSERTS</MainTitle>
            <Subtitle style={{ maxWidth: "540px" }}>Go on a taste journey, where every sip is a sophisticated creative chord, and every dessert is an expression of the most refined gastronomic desires.</Subtitle>
            <div className={styles.recipesContent}>
                <RecipeFilters />
                <RecipeList />
            </div>
        </div>
    );
}

export default Recipes;