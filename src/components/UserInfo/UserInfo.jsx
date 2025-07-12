import { useSelector } from "react-redux";
import { selectUser } from "../../redux/users/selectors";
import { selectLoading } from "../../redux/root/selectors";
import css from "./UserInfo.module.css";
import { selectIsUserCurrentUser } from "../../redux/users/selectors";
import ChageAvatarForm from "../ChageAvatarForm/ChageAvatarForm";
import AvatarIcon from "../AvatarIcon/AvatarIcon";
import { changeAvatar } from "../../api/users";
import toast from "react-hot-toast";
import { useState } from "react";
import Loader from "../Loader/Loader";

const UserInfo = () => {
  const user = useSelector(selectUser);
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
          {cngAvatarLoading ? (
            <Loader />
          ) : (
            <AvatarIcon src={user.avatar} alt={user.name} large />
          )}
          {isUserCurrentUser && (
            <div className={css.changeAvatarWrapper}>
              <ChageAvatarForm onSubmit={changeAvatarHandler} />
            </div>
          )}
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
              <span className={css.userInfoListValue}>
                {user.favoriteCount}
              </span>
            </li>
          )}
          {isUserCurrentUser && (
            <li>
              <span className={css.userInfoListTitle}>Following: </span>
              <span className={css.userInfoListValue}>
                {user.followingCount}
              </span>
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
