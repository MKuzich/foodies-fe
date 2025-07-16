import clsx from "clsx";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import Icons from "@/assets/sprite.svg";
import { setShowAllRecipes } from "@/redux/recipes/slice";

import styles from "./CategoriesItem.module.css";

function CategoriesItem({ id, name, description, option = "category", onClick }) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const image = `/categories/${name}.webp`;

  const handleClick = () => {
    if (option === "All") {
      onClick();
    } else if (option === "Show") {
      setSearchParams({ page: 1 });
      dispatch(setShowAllRecipes(true));
    } else {
      setSearchParams({ category: name });
      dispatch(setShowAllRecipes(false));
    }
  };

  const optionClassMap = {
    All: {
      container: styles.categoriesContainerAll,
      name: styles.categoriesTitleAll,
    },
    Show: {
      container: styles.categoriesContainerShow,
      name: styles.categoriesTitleShow,
    },
  };

  return option === "category" ? (
    <li className={styles.categoriesContainer}>
      <button
        className={styles.categoriesImage}
        onClick={handleClick}
        style={{
          backgroundImage: `image-set(
                          url(${image}) 1x,
                          url(${image.replace(".webp", "@2x.webp")}) 2x
                        )`,
        }}
        loading="lazy"
      >
        <div className={styles.categoriesTitleContainer}>
          <p className={styles.categoriesTitle}>{name}</p>
          <div className={styles.categoriesIconContainer}>
            <svg className={styles.categoriesIcon}>
              <use href={`${Icons}#icon-arrow-up-right`} />
            </svg>
          </div>
        </div>
      </button>
    </li>
  ) : (
    <li className={styles.categoriesContainer}>
      <button
        className={clsx(styles.categoriesButton, optionClassMap[option].container)}
        onClick={handleClick}
      >
        <p className={clsx(styles.categoriesTitleExtra, optionClassMap[option].name)}>{name}</p>
      </button>
    </li>
  );
}

export default CategoriesItem;
