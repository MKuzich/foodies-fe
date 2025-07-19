import clsx from "clsx";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { selectUserInfo } from "../../redux/auth/slice";
import { followUser, unfollowUser } from "../../redux/users/operations";
import { selectTabOpened } from "../../redux/users/selectors";
import AvatarIcon from "../AvatarIcon/AvatarIcon";
import Button from "../Button/Button";
import IconLink from "../IconLink/IconLink";
import css from "./UserCard.module.css";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const tabOpened = useSelector(selectTabOpened);
  const { _, width } = useWindowDimensions();
  const [visibleCount, setVisibleCount] = useState(3);
  useEffect(() => {
    if (width >= 1440) {
      setVisibleCount(4);
    } else {
      setVisibleCount(3);
    }
  }, [width]);

  const me = useSelector(selectUserInfo);
  const isMe = me.id === user.id;
  const isUserIsFollowed = user.isFollowing || tabOpened === "following";

  const handleFollowClick = async () => {
    if (isUserIsFollowed) {
      const result = await dispatch(unfollowUser(user.id));
      if (unfollowUser.fulfilled.match(result)) {
        toast.success("Successfully unfollowed from this user!");
      } else {
        toast.error(result.payload.message || "Failed to unfollow user");
      }
    } else {
      const result = await dispatch(followUser(user.id));
      if (followUser.fulfilled.match(result)) {
        toast.success("Successfully followed to this user!");
      } else {
        toast.error(result.payload.message || "Failed to follow user");
      }
    }
  };

  return (
    <li className={css.userCard}>
      <div className={css.userCardInfo}>
        <AvatarIcon src={user.avatarURL} name={user.name} to={`/user/${user.id}`} medium />
        <div className={css.userInfo}>
          {/* add as typography with variant="h2" RecipePreview has the same */}
          <h2 className={css.userName}>{user.name}</h2>

          <p className={css.userRecipes}>Own recipes: {user.ownRecipes}</p>
          <Button
            inactive
            outlined
            appendClassName={clsx(css.userCardButton, isMe && css.inactive)}
            onClick={handleFollowClick}
            disabled={isMe}
          >
            {isMe ? "It's you" : isUserIsFollowed ? "Unfollow" : "Follow"}
          </Button>
        </div>
      </div>
      <ul className={css.userRecepiesTop}>
        {user.popularRecipes.slice(0, visibleCount).map((recipe) => (
          <li key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`} key={recipe.id} className={css.userRecepiesTopItem}>
              <img
                loading="lazy"
                src={recipe.thumb}
                alt={recipe.title}
                className={css.userRecepiesTopItemImg}
              />
            </Link>
          </li>
        ))}
      </ul>
      <div className={css.userCardButtons}>
        <IconLink to={`/user/${user.id}`} name="arrow" black />
      </div>
    </li>
  );
};

export default UserCard;
