import clsx from "clsx";

import skeletonCss from "../Skeleton/Skeleton.module.css";
import css from "./UserInfo.module.css";

const UserInfoSkeleton = () => {
  return (
    <div className={css.userInfoWrapper}>
      <div className={css.userInfo}>
        <div className={css.userAvatarContainer}>
          <div
            className={clsx(skeletonCss.skeleton, skeletonCss.skeletonAvatar, skeletonCss.large)}
          ></div>
        </div>
        <div className={css.userName}>
          <div
            className={clsx(skeletonCss.skeleton, skeletonCss.skeletonTitle)}
            style={{ width: "200px" }}
          ></div>
        </div>
        <ul className={css.userInfoList}>
          <li>
            <div
              className={clsx(skeletonCss.skeleton, skeletonCss.skeletonTinyText)}
              style={{ maxWidth: "none", width: "250px" }}
            ></div>
          </li>
          <li>
            <div
              className={clsx(skeletonCss.skeleton, skeletonCss.skeletonTinyText)}
              style={{ maxWidth: "none", width: "250px" }}
            ></div>
          </li>
          <li>
            <div
              className={clsx(skeletonCss.skeleton, skeletonCss.skeletonTinyText)}
              style={{ maxWidth: "none", width: "250px" }}
            ></div>
          </li>
          <li>
            <div
              className={clsx(skeletonCss.skeleton, skeletonCss.skeletonTinyText)}
              style={{ maxWidth: "none", width: "250px" }}
            ></div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserInfoSkeleton;
