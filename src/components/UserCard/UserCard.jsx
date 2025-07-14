import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { selectUserInfo } from "../../redux/auth/authSlice";
import { followUser, unfollowUser } from "../../redux/users/operations";
import AvatarIcon from "../AvatarIcon/AvatarIcon";
import Button from "../Button/Button";
// import { useWindowDimensions } from "../../hooks/useWindowDimensions";
// import { useState, useEffect } from "react";
import IconLink from "../IconLink/IconLink";
import css from "./UserCard.module.css";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  // const { _, width } = useWindowDimensions();
  // const [visibleCount, setVisibleCount] = useState(3);
  // useEffect(() => {
  //   if (width >= 1440) {
  //     setVisibleCount(4);
  //   } else {
  //     setVisibleCount(3);
  // }
  // }, [width]);

  const me = useSelector(selectUserInfo);
  const isMe = me.id === user.id;
  const isUserIsFollowed = user.follow.followerId === me.id || user.follow.followingId === me.id;

  const handleFollowClick = () => {
    if (isUserIsFollowed) {
      dispatch(unfollowUser(user.id));
      toast.success("Successfully unfollowed from this user!");
      return;
    }
    dispatch(followUser(user.id));
    toast.success("Successfully followed to this user!");
  };

  return (
    <li className={css.userCard}>
      <div className={css.userCardInfo}>
        <AvatarIcon src={user.avatarURL} name={user.name} medium />
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
            onClick={handleFollowClick}
            disabled={isMe}
          >
            {isMe ? "It's you" : isUserIsFollowed ? "Following" : "Follow"}
          </Button>
        </div>
      </div>
      <ul className={css.userRecepiesTop}>
        {/* {user.recepiesTop.slice(0, visibleCount).map((recipe) => (
          <li key={recipe.id} className={css.userRecepiesTopItem}>
            <img
              src={recipe.thumb}
              alt={recipe.title}
              className={css.userRecepiesTopItemImg}
            />
          </li>
        ))} */}
      </ul>

      <div className={css.userCardButtons}>
        <IconLink to={`/user/${user.id}`} name="arrow" black />
      </div>
    </li>
  );
};

export default UserCard;
