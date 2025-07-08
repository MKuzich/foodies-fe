import styles from "./CategoriesItem.module.css";
import clsx from "clsx";

function CategoriesItem({ title, option = "category" }) {

    const image = `/src/assets/categories/${title}.webp`;
    console.log(image);
    return (
        option === "category" ? (
            <li className={styles.categoriesContainer}>
                <div
                    className={styles.categoriesImage}
                    style={{
                        backgroundImage: `image-set(
                            url(${image}) 1x,
                            url(${image.replace('.webp', '@2x.webp')}) 2x,
                            url(${image.replace('.webp', '@3x.webp')}) 3x
                        )`
                    }}
                >
                    <div className={styles.categoriesTitleContainer}>
                        <p className={styles.categoriesTitle}>{title}</p>
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