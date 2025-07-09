import css from "./UserCard.module.css";
import IconButton from "../IconButton/IconButton";
import Button from "../Button/Button";
import { useSelector } from "react-redux";
import { selectIsUserCurrentUser } from "../../redux/users/selectors";

const UserCard = ({ user }) => {
  const isUserCurrentUser = useSelector(selectIsUserCurrentUser);
  return (
    <li className={css.userCard}>
      <div className={css.userCardInfo}>
        <img
          src={user.avatarURL}
          alt={`User avatar picture ${user.name}`}
          className={css.userAvatar}
        />
        <div className={css.userInfo}>
          {/* add as typography with variant="h2" RecipePreview has the same */}
          <h2 className={css.userName}>{user.name}</h2>

          <p className={css.userRecipes}>Own recipes: {user.ownRecipes}</p>
          <Button
            inactive // not work with outlined
            outlined
            style={{
              borderColor: "var(--inactive-color)",
              color: "var(--inactive-color)", // TODO remove after fix outlined
              marginTop: "4px",
              padding: "8px 16px", // TODO: rewrite with props ?
              fontSize: "14px", // TODO: rewrite with props ?
              lineHeight: "1.43",
            }}
          >
            {isUserCurrentUser
              ? "Follow"
              : isUserFollowed
              ? "Following"
              : "Follow"}
          </Button>
        </div>
      </div>
      <IconButton></IconButton>
    </li>
  );
};

export default UserCard;
