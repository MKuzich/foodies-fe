import RecipeCard from "../RecipeCard/RecipeCard";
import styles from "./PopularRecipes.module.css";

function PopularRecipes() {
    return (
        <div>
            <h2 className={styles.popularRecipesTitle}>Popular Recipes</h2>
            <ul className={styles.popularRecipesList}>
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
            </ul>
        </div>
    )
}

export default PopularRecipes;