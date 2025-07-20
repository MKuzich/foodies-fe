/* eslint-disable jsx-a11y/label-has-associated-control */
import clsx from "clsx";
import { useId, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { selectLoading } from "../../redux/root/selectors";
import { changeAvatar } from "../../redux/users/operations";
import { selectIsUserCurrentUser, selectUser } from "../../redux/users/selectors";
import AvatarIcon from "../AvatarIcon/AvatarIcon";
import ChageAvatarForm from "../ChageAvatarForm/ChageAvatarForm";
import Meta from "../Meta/Meta";
import skeletonCss from "../Skeleton/Skeleton.module.css";
import css from "./UserInfo.module.css";

const UserInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);
  const inputId = useId();
  const isUserCurrentUser = useSelector(selectIsUserCurrentUser);
  const [cngAvatarLoading, setCngAvatarLoading] = useState(false);

  const changeAvatarHandler = async ({ avatarFile }) => {
    setCngAvatarLoading(true);
    const result = await dispatch(changeAvatar(avatarFile[0]));
    if (changeAvatar.fulfilled.match(result)) {
      toast.success("Avatar changed successfully");
    } else {
      toast.error(result.payload.message || "Failed to update avatar");
    }
    setCngAvatarLoading(false);
  };

  return user ? (
    <>
      <Meta
        title={user.name || "User Profile"}
        description={
          isUserCurrentUser
            ? "Manage your profile, view your recipes and followers."
            : "View user profile, their recipes and followers."
        }
        {...(user.avatarURL ? { image: user.avatarURL } : {})}
      />
      <div className={css.userInfoWrapper}>
        <div className={css.userInfo}>
          <div className={css.userAvatarContainer}>
            {isUserCurrentUser && (
              <div className={css.changeAvatarWrapper}>
                <label
                  className={clsx(css.changeAvatarLabel, cngAvatarLoading && css.loading)}
                  htmlFor={inputId}
                ></label>
                <ChageAvatarForm onSubmit={changeAvatarHandler} inputId={inputId} />
              </div>
            )}
            {cngAvatarLoading ? (
              <div
                className={clsx(
                  skeletonCss.skeleton,
                  skeletonCss.skeletonAvatar,
                  skeletonCss.large,
                )}
              ></div>
            ) : (
              <AvatarIcon src={user.avatarURL} name={user.name} large />
            )}
          </div>
          <div className={css.userName}>{user.name}</div>
          <ul className={css.userInfoList}>
            <li className={css.userInfoListItem}>
              <span className={css.userInfoListTitle}>Email:</span>
              <span className={css.userInfoListValue}>{user.email}</span>
            </li>
            <li className={css.userInfoListItem}>
              <span className={css.userInfoListTitle}>Added recipes:</span>
              <span className={css.userInfoListValue}>{user.createdCount}</span>
            </li>
            {isUserCurrentUser && (
              <li className={css.userInfoListItem}>
                <span className={css.userInfoListTitle}>Favorites:</span>
                <span className={css.userInfoListValue}>{user.favoriteCount}</span>
              </li>
            )}
            {isUserCurrentUser && (
              <li className={css.userInfoListItem}>
                <span className={css.userInfoListTitle}>Following:</span>
                <span className={css.userInfoListValue}>{user.followingCount}</span>
              </li>
            )}
            <li className={css.userInfoListItem}>
              <span className={css.userInfoListTitle}>Followers:</span>
              <span className={css.userInfoListValue}>{user.followersCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  ) : (
    !loading && <div>User not found...</div>
  );
};

export default UserInfo;
