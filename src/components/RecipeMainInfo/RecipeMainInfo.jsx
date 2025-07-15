import RecipeIngredients from "../RecipeIngredients/RecipeIngredients";
import styles from "./RecipeMainInfo.module.css";

const RecipeMainInfo = ({ recipe }) => {
  const { owner: author } = recipe;
  return (
    <div className={styles.wrapper}>
      <img src={recipe.thumb} alt={recipe.title} className={styles.image} />
      <div className={styles.content}>
        <div className={styles.mainInfo}>
          <h1 className={styles.title}>{recipe.title}</h1>

          <div className={styles.meta}>
            <span className={styles.category}>{recipe.category}</span>
            <span className={styles.category}>{recipe.time}</span>
          </div>

          <p className={styles.description}>{recipe.description}</p>

          <button className={styles.authorBtn}>
            <img src={author.avatarURL} alt={author.name} className={styles.avatar} />
            <div className={styles.authorInfo}>
              Created by: <span className={styles.authorName}>{author.name}</span>
            </div>
          </button>
        </div>
        <h3 className={styles.itemTitle}>Ingredients</h3>
        <RecipeIngredients ingredients={recipe.ingredients} />
        <h3 className={styles.itemTitle}>Recipe Preparation</h3>
        <p className={styles.description}>{recipe.instructions}</p>
      </div>
    </div>
  );
};

export default RecipeMainInfo;
