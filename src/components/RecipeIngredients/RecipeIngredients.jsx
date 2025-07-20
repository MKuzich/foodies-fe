import { Tooltip } from "react-tooltip";

import styles from "./RecipeIngredients.module.css";

const RecipeIngredients = ({ ingredients }) => {
  return (
    <section className={styles.section}>
      <h4 className={styles.itemTitle}>Ingredients</h4>
      <ul className={styles.ingredientList}>
        {ingredients.map((item, index) => {
          return (
            <li key={index} className={styles.ingredientListItem}>
              <img
                loading="lazy"
                src={item.img || "/ingredient-placeholder.png"}
                alt={item.name}
                className={styles.ingredientListImg}
                data-tooltip-id="ingredient-tooltip"
                data-tooltip-content={`${item.name} - ${item.measure}`}
                onError={(e) => {
                  e.target.src = "/noImg.webp";
                  e.target.srcSet = "/noImg.webp 1x, /noImg@2x.webp 2x";
                  e.target.onerror = null;
                }}
              />
              <div className={styles.ingredientsInfoWrapper}>
                <span className={styles.ingredientName}>{item.name}</span>
                <span className={styles.ingredientMeasure}>{item.measure}</span>
              </div>
            </li>
          );
        })}
      </ul>
      <Tooltip
        id="ingredient-tooltip"
        border="1px solid var(--title-color)"
        color="var(--text-color)"
        place="top"
        effect="solid"
        delayHide={500}
        clickable={true}
        style={{
          backgroundColor: "var(--white-color)",
          color: "var(--title-color)",
          borderRadius: "30px",
          padding: "8px 12px",
          fontSize: "14px",
        }}
      />
    </section>
  );
};

export default RecipeIngredients;
