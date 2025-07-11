import css from "./UserCard.module.css";
import Button from "../Button/Button";
import { useSelector } from "react-redux";
import { selectIsUserCurrentUser } from "../../redux/users/selectors";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { useState, useEffect } from "react";
import IconLink from "../IconLink/IconLink";

const UserCard = ({ user }) => {
  const { _, width } = useWindowDimensions();
  const [visibleCount, setVisibleCount] = useState(3);
  useEffect(() => {
    if (width >= 1440) {
      setVisibleCount(4);
    } else {
      setVisibleCount(3);
    }
  }, [width]);

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
            {isUserCurrentUser ? "Following" : "Follow"}
          </Button>
        </div>
      </div>
      <ul className={css.userRecepiesTop}>
        {user.recepiesTop.slice(0, visibleCount).map((recipe) => (
          <li key={recipe.id} className={css.userRecepiesTopItem}>
            <img
              src={recipe.thumb}
              alt={recipe.title}
              className={css.userRecepiesTopItemImg}
            />
          </li>
        ))}
      </ul>

      <div className={css.userCardButtons}>
        <IconLink to={`/user/${user.id}`} name="arrow" />
      </div>
    </li>
  );
};

export default UserCard;
