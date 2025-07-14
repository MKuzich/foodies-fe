import clsx from "clsx";
import { useId, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

import { changeAvatar } from "../../api/users";
import { selectLoading } from "../../redux/root/selectors";
import { selectIsUserCurrentUser, selectUser } from "../../redux/users/selectors";
import AvatarIcon from "../AvatarIcon/AvatarIcon";
import ChageAvatarForm from "../ChageAvatarForm/ChageAvatarForm";
import Loader from "../Loader/Loader";
import css from "./UserInfo.module.css";

const UserInfo = () => {
  const user = useSelector(selectUser);
  const inputId = useId();
  const loading = useSelector(selectLoading);
  const isUserCurrentUser = useSelector(selectIsUserCurrentUser);
  const [cngAvatarLoading, setCngAvatarLoading] = useState(false);
  const changeAvatarHandler = async ({ avatarFile }) => {
    try {
      setCngAvatarLoading(true);
      await changeAvatar(avatarFile[0]);
      toast.success("Avatar changed successfully");
    } catch (error) {
      toast.error(`Error changing avatar: ${error.message}`);
    } finally {
      setCngAvatarLoading(false);
    }
  };

  return user ? (
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
          {cngAvatarLoading ? <Loader /> : <AvatarIcon src={user.avatar} name={user.name} large />}
        </div>
        <div className={css.userName}>{user.name}</div>
        <ul className={css.userInfoList}>
          <li>
            <span className={css.userInfoListTitle}>Email: </span>
            <span className={css.userInfoListValue}>{user.email}</span>
          </li>
          <li>
            <span className={css.userInfoListTitle}>Added recipes: </span>
            <span className={css.userInfoListValue}>{user.createdCount}</span>
          </li>
          {isUserCurrentUser && (
            <li>
              <span className={css.userInfoListTitle}>Favorites: </span>
              <span className={css.userInfoListValue}>{user.favoriteCount}</span>
            </li>
          )}
          {isUserCurrentUser && (
            <li>
              <span className={css.userInfoListTitle}>Following: </span>
              <span className={css.userInfoListValue}>{user.followingCount}</span>
            </li>
          )}
          <li>
            <span className={css.userInfoListTitle}>Followers: </span>
            <span className={css.userInfoListValue}>{user.followersCount}</span>
          </li>
        </ul>
      </div>
    </div>
  ) : (
    !loading && <div>User not found...</div>
  );
};

export default UserInfo;
