import clsx from "clsx";

import Icon from "../Icon";
import IconButton from "../IconButton/IconButton";
import skeletonCss from "../Skeleton/Skeleton.module.css";
import s from "./ProfileTestimonial.module.css";

const ProfileTestimonialSkeleton = () => {
  return (
    <div className={s.testimonialItem}>
      <div className={s.recipeWrapper}>
        <div
          className={clsx(skeletonCss.skeleton, skeletonCss.skeletonAvatar, skeletonCss.small)}
        />
      </div>
      <div className={s.testimonialContent}>
        <div className={clsx(skeletonCss.skeleton, skeletonCss.skeletonTitle, s.skeletonTitle)} />

        <div className={s.testimonialWrapper}>
          <Icon name="comment" className={s.commentIcon} />
          <div className={s.authorInfo} style={{ alignItems: "flex-start" }}>
            <div
              className={clsx(
                s.skeletonAuthorName,
                skeletonCss.skeleton,
                skeletonCss.skeletonTinyText,
              )}
            />
            <div
              className={clsx(
                skeletonCss.skeleton,
                skeletonCss.skeletonTinyText,
                s.skeletonAuthorDate,
              )}
            />
          </div>
          <div
            className={clsx(
              skeletonCss.skeleton,
              skeletonCss.skeletonDescription,
              s.skeletonAuthorDescription,
            )}
          ></div>
          <IconButton
            disabled
            name="trash"
            style={{ position: "absolute", right: "10px", top: "10px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileTestimonialSkeleton;
