import clsx from "clsx";
import { useSelector } from "react-redux";

import { selectIsUserCurrentUser } from "../../redux/users/selectors";
import IconButton from "../IconButton/IconButton";
import IconLink from "../IconLink/IconLink";
import skeletonCss from "../Skeleton/Skeleton.module.css";
import css from "./RecipePreview.module.css";

const RecipePreviewSkeleton = () => {
  const isCurrentUser = useSelector(selectIsUserCurrentUser);

  return (
    <div className={css.recipePreview}>
      <div className={clsx(skeletonCss.skeleton, skeletonCss.skeletonImageCard)}></div>
      <div className={css.recipePreviewWrapper}>
        <div className={css.recipePreviewInfo}>
          <div
            className={clsx(skeletonCss.skeleton, skeletonCss.skeletonTitle)}
            style={{ width: "40%" }}
          ></div>
          <div className={clsx(skeletonCss.skeleton, skeletonCss.skeletonDescription)}></div>
        </div>
        <div className={css.recipePreviewButtons}>
          <IconLink name="arrow" black disabled />
          {isCurrentUser && <IconButton name="trash" disabled />}
        </div>
      </div>
    </div>
  );
};

export default RecipePreviewSkeleton;
