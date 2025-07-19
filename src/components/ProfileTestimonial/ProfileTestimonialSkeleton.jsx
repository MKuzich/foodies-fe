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
        <div
          className={clsx(skeletonCss.skeleton, skeletonCss.skeletonTitle)}
          style={{ marginBottom: "15px", width: "215px" }}
        />

        <div className={s.testimonialWrapper}>
          <Icon name="comment" className={s.commentIcon} />
          <div className={s.authorInfo}>
            <div
              className={clsx(skeletonCss.skeleton, skeletonCss.skeletonTinyText)}
              style={{ maxWidth: "none", width: "60px" }}
            />
            <div
              className={clsx(skeletonCss.skeleton, skeletonCss.skeletonTinyText)}
              style={{ maxWidth: "none", width: "120px" }}
            />
          </div>
          <div
            className={clsx(skeletonCss.skeleton, skeletonCss.skeletonDescription)}
            style={{ width: "250px", marginTop: "5px" }}
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
