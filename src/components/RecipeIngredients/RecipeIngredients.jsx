import styles from "./RecipeIngredients.module.css";

const RecipeIngredients = ({ ingredients }) => (
  <ul className={styles.ingredientList}>
    {ingredients.map((item, index) => (
      <li key={index} className={styles.ingredientListItem}>
        <div className={styles.imgWrapper}>
          <img
            src={item.img || "/ingredient-placeholder.png"}
            alt={item.name}
            className={styles.ingredientListImg}
          />
        </div>
        <div className={styles.ingredientsInfo}>
          <span className={styles.ingredientName}>{item.name}</span>
          <span className={styles.ingredientMeasure}>{item.measure}</span>
        </div>
      </li>
    ))}
  </ul>
);

export default RecipeIngredients;
