import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import Container from "../../components/Container/Container";
import PathInfo from "../../components/PathInfo/PathInfo";
import MainTitle from "../../components/MainTitle/MainTitle";
import Subtitle from "../../components/Subtitle/Subtitle";
import UserInfo from "../../components/UserInfo/UserInfo";
import TabsList from "../../components/TabsList/TabsList";
import TabItem from "../../components/TabItem/TabItem";
import Button from "../../components/Button/Button";
import { fetchUser, fetchUserRecipes } from "../../redux/users/operations";
import {
  selectIsUserCurrentUser,
  selectIsUserIsFollowed,
} from "../../redux/users/selectors";
import { addToFollowing, removeFromFollowing } from "../../redux/users/slice";
import UserRecepies from "../../components/UserRecepies/UserRecepies";

import css from "./UserPage.module.css";

const UserPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(id));
    dispatch(fetchUserRecipes(id));
  }, [dispatch, id]);

  const location = useLocation();

  const isBaseUserPath =
    location.pathname === `/user/${id}` || location.pathname === `/user/${id}/`;

  const isUserCurrentUser = useSelector(selectIsUserCurrentUser);
  const isUserIsFollowed = useSelector(selectIsUserIsFollowed);
  const openLogoutModal = () => {};
  const recepieTabName = isUserCurrentUser ? "My recepies" : "recepies";
  const handleFollowClick = () => {
    if (isUserIsFollowed) {
      dispatch(removeFromFollowing(id));
      console.log("You can alway return it back :)");
      return;
    }
    dispatch(addToFollowing(id));
    console.log("We remember that!");
  };

  return (
    <>
      <Container>
        <PathInfo pathName={"home"} currentName={"profile"} />
        <MainTitle>profile</MainTitle>
        <Subtitle>
          Reveal your culinary art, share your favorite recipe and create
          gastronomic masterpieces with us.
        </Subtitle>
        <UserInfo />
        {isUserCurrentUser ? (
          <Button onClick={openLogoutModal} style={{ width: "100%" }}>
            Log out
          </Button>
        ) : isUserIsFollowed ? (
          <Button onClick={handleFollowClick} style={{ width: "100%" }}>
            Unfollow
          </Button>
        ) : (
          <Button onClick={handleFollowClick} style={{ width: "100%" }}>
            Follow
          </Button>
        )}
      </Container>
      <div className={css.tabsContainer}>
        <TabsList>
          <TabItem name={recepieTabName} to={`/user/${id}`} />
          {isUserCurrentUser && (
            <TabItem name="My Favorites" to={`/user/${id}/favorites`} />
          )}
          <TabItem name="Followers" to={`/user/${id}/followers`} />
          {isUserCurrentUser && (
            <TabItem name="Following" to={`/user/${id}/following`} />
          )}
        </TabsList>
        <Container>
          <div className={css.tabsContent}>
            {isBaseUserPath && <UserRecepies />}
            <Outlet />
          </div>
        </Container>
      </div>
    </>
  );
};

export default UserPage;
