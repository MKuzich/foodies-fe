import { useDispatch } from "react-redux";
import styles from "./CategoriesItem.module.css";
import clsx from "clsx";
import { setSelectedCategory } from "../../redux/categories/slice";

function CategoriesItem({ id, title, option = "category" }) {

    const image = `/src/assets/categories/${title}.webp`;

    const dispatch = useDispatch();

    const handleClick = () => {
        if (option === "all") {
            dispatch(setSelectedCategory({
                id: null,
                title
            }));
        } else {
            dispatch(setSelectedCategory({
                id,
                title
            }));
        }
    }

    return (
        option === "category" ? (
            <li className={styles.categoriesContainer}>
                <div
                    className={styles.categoriesImage}
                    style={{
                        backgroundImage: `image-set(
                          url(${image}) 1x,
                          url(${image.replace('.webp', '@2x.webp')}) 2x
                        )`
                    }}
                    loading="lazy"
                >
                    <div className={styles.categoriesTitleContainer}>
                        <p className={styles.categoriesTitle}>{title}</p>
                        <div className={styles.categoriesIconContainer} onClick={handleClick}>
                            <svg className={styles.categoriesIcon} >
                                <use href="/src/assets/sprite.svg#icon-arrow-up-right" />
                            </svg>
                        </div>
                    </div>
                </div>
            </li>
        ) : (
            <li className={clsx(styles.categoriesContainer, styles.categoriesContainerAll)} onClick={handleClick}>
                <p className={styles.categoriesTitleAll}>All categories</p>
            </li>
        )
    );
}

export default CategoriesItem;