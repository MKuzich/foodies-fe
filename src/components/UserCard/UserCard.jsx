import css from "./UserCard.module.css";
import MainTitle from "../MainTitle/MainTitle";
import IconButton from "../IconButton/IconButton";
import Button from "../Button/Button";

const UserCard = ({ user }) => {
  const btnStyle = {
    color: "var(--inactive-color)",
    borderColor: "var(--inactive-color)",
    marginTop: "4px",
  };
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
          <Button outlined style={btnStyle}>
            Follow
          </Button>
        </div>
      </div>
      <IconButton></IconButton>
    </div>
  );
};

export default UserCard;
