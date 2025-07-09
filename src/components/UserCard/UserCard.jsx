import css from "./UserCard.module.css";
import IconButton from "../IconButton/IconButton";
import Button from "../Button/Button";

const UserCard = ({ user }) => {
  return (
    <div className={css.userCard}>
      <div className={css.userCardInfo}>
        <img
          src={user.avatar}
          alt={`User avatar picture ${user.name}`}
          className={css.userAvatar}
        />
        <div className={css.userInfo}>
          <h2 className={css.userName}>{user.name}</h2>
          <p className={css.userRecipes}>Own recipes: {user.ownRecipes}</p>
          <Button outlined inactive style={{ marginTop: "4px" }}>
            Follow
          </Button>
        </div>
      </div>
      <IconButton></IconButton>
    </div>
  );
};

export default UserCard;
