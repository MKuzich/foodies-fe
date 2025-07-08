import styles from "./CategoriesItem.module.css";
import clsx from "clsx";


function CategoriesItem({ image, title, option = "category" }) {
    return (
        option === "category" ? (
            <li className={styles.categoriesContainer}>
                <div className={styles.categoriesImage} style={{ backgroundImage: `url(${image ? image : "/src/modules/categories/assets/Beef.jpg"})` }}>
                    <div className={styles.categoriesTitleContainer}>
                        <p className={styles.categoriesTitle}>{title ? title : "Beef"}</p>
                        <div className={styles.categoriesIconContainer}>
                            <svg className={styles.categoriesIcon}>
                                <use href="/src/assets/sprite.svg#icon-arrow-up-right" />
                            </svg>
                        </div>
                    </div>
                </div>
            </li>
        ) : (
            <li className={clsx(styles.categoriesContainer, styles.categoriesContainerAll)}>
                <p className={styles.categoriesTitleAll}>All categories</p>
            </li>
        )
    );
}

export default CategoriesItem;