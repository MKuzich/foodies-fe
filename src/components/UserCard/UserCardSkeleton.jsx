import clsx from "clsx";
import { useEffect, useState } from "react";

import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import IconLink from "../IconLink/IconLink";
import skeletonCss from "../Skeleton/Skeleton.module.css";
import css from "./UserCard.module.css";

const UserCardSkeleton = () => {
  const { _, width } = useWindowDimensions();
  const [visibleCount, setVisibleCount] = useState(3);
  useEffect(() => {
    if (width >= 1440) {
      setVisibleCount(4);
    } else {
      setVisibleCount(3);
    }
  }, [width]);

  return (
    <div className={css.userCard}>
      <div className={css.userCardInfo}>
        <div className={clsx(skeletonCss.skeleton, skeletonCss.skeletonAvatar)}></div>
        <div className={css.userInfo}>
          <div className={clsx(skeletonCss.skeleton, skeletonCss.skeletonTitle)}></div>
          <div className={clsx(skeletonCss.skeleton, skeletonCss.skeletonTinyText)}></div>
          <div
            className={clsx(skeletonCss.skeleton, skeletonCss.skeletonButton, skeletonCss.medium)}
            style={{ marginTop: "4px" }}
          ></div>
        </div>
        <ul className={css.userRecepiesTop}>
          <li className={clsx(skeletonCss.skeleton, skeletonCss.skeletonImageCard)}></li>
          <li className={clsx(skeletonCss.skeleton, skeletonCss.skeletonImageCard)}></li>
          <li className={clsx(skeletonCss.skeleton, skeletonCss.skeletonImageCard)}></li>
          {visibleCount === 4 && (
            <li className={clsx(skeletonCss.skeleton, skeletonCss.skeletonImageCard)}></li>
          )}
        </ul>
        <div className={css.userCardButtons}>
          <IconLink name="arrow" black disabled />
        </div>
      </div>
    </div>
  );
};

export default UserCardSkeleton;
