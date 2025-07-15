import styles from "./RecipePreparation.module.css";

const RecipePreparation = ({ instructions }) => (
  <>
    <h3 className={styles.itemTitle}>Recipe Preparation</h3>
    <p className={styles.description}>{instructions}</p>
  </>
);

export default RecipePreparation;
