import styles from "./CategoriesItem.module.css";
import clsx from "clsx";


function CategoriesItem({ image, title, option = "category" }) {
    return (
        option === "category" ? (
            <div className={styles.categoriesContainer}>
                <div className={styles.categories} style={{ backgroundImage: `url(${image ? image : "/src/modules/categories/assets/Beef.jpg"})` }}>
                    <div className={styles.categoriesTitleContainer}>
                        <p className={styles.categoriesTitle}>{title ? title : "Beef"}</p>
                    </div>
                </div>
            </div>
        ) : (
            <div className={clsx(styles.categoriesContainer, styles.categoriesContainerAll)}>
                <p className={styles.categoriesTitleAll}>All categories</p>
            </div>
        )
    );
}

export default CategoriesItem;