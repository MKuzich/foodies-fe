import { useSelector } from "react-redux";
import { selectUser } from "../../redux/users/selectors";
import { selectLoading } from "../../redux/root/selectors";
import Button from "../Button/Button";
import css from "./UserInfo.module.css";

const UserInfo = () => {
  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);
 const isUserCurrentUser = true;
 const openChangeAvatarModal = () => {};


  return user ? (
    <div className={css.userInfo}>
        <div className={css.userAvatarContainer}>
            <img src={user.avatar} alt={`Profile picture of user ${user.name}`} className={css.userAvatar} />
            {isUserCurrentUser && <Button className={css.changeAvatarButton} onClick={openChangeAvatarModal}/>}
        </div>
      <div className={css.userName}>{user.name}</div>
      <ul className={css.userInfoList}>
        <li>
            <span className={css.userInfoListTitle}>Email:</span>
            <span className={css.userInfoListValue}> {user.email}</span>
        </li>
        <li>
            <span className={css.userInfoListTitle}>Added recipes:</span>
            <span className={css.userInfoListValue}> {user.added_recipes}</span>
        </li>
        {isUserCurrentUser && <li>
            <span className={css.userInfoListTitle}>Favorites:</span>
            <span className={css.userInfoListValue}> {user.favorites}</span>
        </li>}
        {isUserCurrentUser && <li>
            <span className={css.userInfoListTitle}>Following:</span>
            <span className={css.userInfoListValue}> {user.following}</span>
        </li>}
        <li>
            <span className={css.userInfoListTitle}>Followers:</span>
            <span className={css.userInfoListValue}> {user.followers}</span>
        </li>
      </ul>
    </div>
  ) : (
    !loading && <div>User not found...</div>
  );
};

export default UserInfo;
