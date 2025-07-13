import styles from "./RecipeCard.module.css";
import IconButton from "../IconButton/IconButton";

function RecipeCard({ recipe, title = "Tart", image = "/src/assets/tart.png", description = "To make the pastry, measure the flour into a bowl and rub in the butter with your fingertips until the mixture resembles fine breadcrumbs." }) {
    return (
        <li className={styles.recipeItem}>
            <img src={image} alt="recipe" className={styles.recipeImage} />
            <h3 className={styles.recipeTitle}>{title}</h3>
            <p className={styles.recipeDescription}>{description}</p>
            <div className={styles.recipeInfo}>
                <div className={styles.recipeAvatarWrapper}>
                    <img src={"/src/assets/avatar.png"} alt="avatar" className={styles.recipeInfoAvatar} />
                    <p className={styles.recipeAvatarName}>Ivetta</p>
                </div>
                <div className={styles.recipeIconsWrapper}>

                    {/* <span className={styles.recipeIconContainer}>
                        <svg className={styles.recipeIcon}>
                            <use href="/src/assets/sprite.svg#icon-heart"></use>
                        </svg>
                    </span> */}
                      {/* <span className={styles.recipeIconContainer}>
                        <svg className={styles.recipeIcon}>
                            <use href="/src/assets/sprite.svg#icon-arrow-up-right" />
                        </svg>
                    </span> */}
                    {/* TODO: correct styles size for tablet and desktop */}
                    <IconButton name="like" />
                    <IconButton name="arrowUpRight" />
                  
                </div>
            </div>
        </li>
    );
}

export default RecipeCard;