import { useDispatch } from "react-redux";
import styles from "./CategoriesItem.module.css";
import clsx from "clsx";
import { setSelectedCategory } from "../../redux/categories/slice";

function CategoriesItem({ id, title, description, option = "category", onClick }) {

    const image = `/categories/${title}.webp`;

    const dispatch = useDispatch();

    const handleClick = () => {
        if (option === "All") {
            onClick();
        } else if (option === "Show") {
            dispatch(setSelectedCategory({
                id: null,
                title,
                description
            }));
        } else {
            dispatch(setSelectedCategory({
                id,
                title,
                description
            }));
        }
    }

    const optionClassMap = {
        All: {
            container: styles.categoriesContainerAll,
            title: styles.categoriesTitleAll,
        },
        Show: {
            container: styles.categoriesContainerShow,
            title: styles.categoriesTitleShow,
        },
    };

    return (
        option === "category" ? (
            <li className={styles.categoriesContainer} >
                <button
                    className={styles.categoriesImage}
                    onClick={handleClick}
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
                        <div className={styles.categoriesIconContainer} >
                            <svg className={styles.categoriesIcon} >
                                <use href="/src/assets/sprite.svg#icon-arrow-up-right" />
                            </svg>
                        </div>
                    </div>
                </button>
            </li>
        ) : (
            <li className={styles.categoriesContainer}>
                <button className={clsx(styles.categoriesButton, optionClassMap[option].container)} onClick={handleClick}>
                    <p className={clsx(styles.categoriesTitleExtra, optionClassMap[option].title)}>{title}</p>
                </button>
            </li>
        )
    );
}

export default CategoriesItem;