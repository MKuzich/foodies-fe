import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import { fetchUser } from "../../redux/users/operations";
import {
  selectIsUserCurrentUser,
  selectIsUserIsFollowed,
} from "../../redux/users/selectors";
import ListItems from "../../components/ListItems/ListItems";
import { addToFollowing, removeFromFollowing } from "../../redux/users/slice";
import {
  currentUserPageErrors,
  userPageErrors,
} from "../../utils/const/userPageErrors";
import {
  fetchUserRecipes,
  fetchUserFavorites,
  fetchUserFollowers,
  fetchUserFollowing,
} from "../../utils/api/users";
import css from "./UserPage.module.css";
import clsx from "clsx";
import { toast } from "react-hot-toast";

const UserPage = () => {
  console.log("UserPage"); // with routes it have the same effect

  const { id } = useParams();
  const dispatch = useDispatch();

  const [tabOpened, setTabOpened] = useState("recipes");

  const handleChange = (e, newValue) => {
    setTabOpened(newValue);
  };

  useEffect(() => {
    dispatch(fetchUser(id));
  }, [dispatch, id]);

  const isUserCurrentUser = useSelector(selectIsUserCurrentUser);
  const isUserIsFollowed = useSelector(selectIsUserIsFollowed);
  const [userRecipes, setUserRecipes] = useState(null);
  const [userFavorites, setUserFavorites] = useState(null);
  const [userFollowers, setUserFollowers] = useState(null);
  const [userFollowing, setUserFollowing] = useState(null);

  useEffect(() => {
    setUserRecipes(fetchUserRecipes(id));
    setUserFavorites(fetchUserFavorites(id));
    setUserFollowers(fetchUserFollowers(id));
    setUserFollowing(fetchUserFollowing(id));
  }, [id]);

  const openLogoutModal = () => {};

  const recepieTabName = isUserCurrentUser ? "My recepies" : "recepies";

  const handleFollowClick = () => {
    if (isUserIsFollowed) {
      dispatch(removeFromFollowing(id));
      toast.success("Successfully unfollowed from this user!");
      return;
    }
    dispatch(addToFollowing(id));
    toast.success("Successfully followed to this user!");
  };

  const errorMap = isUserCurrentUser ? currentUserPageErrors : userPageErrors;

  return (
    <div className={css.userProfile}>
      <Container>
        <PathInfo pathName={"home"} currentName={"profile"} />
        <MainTitle>profile</MainTitle>
        <Subtitle>
          Reveal your culinary art, share your favorite recipe and create
          gastronomic masterpieces with us.
        </Subtitle>
        <div className={css.userProfile}>
          <div className={css.userProfileInfo}>
            <UserInfo />
            <div className={css.followButtonContainer}>
              <div className={css.followButtonWrapper}>
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
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className={css.userProfileTabsContainer}>
        <div className={css.tabsWrapper}>
          <TabsList>
            <TabItem
              name={recepieTabName}
              onClick={(e) => handleChange(e, "recipes")}
              isActive={tabOpened === "recipes"}
            />
            {isUserCurrentUser && (
              <TabItem
                name="My Favorites"
                onClick={(e) => handleChange(e, "favorites")}
                isActive={tabOpened === "favorites"}
              />
            )}
            <TabItem
              name="Followers"
              onClick={(e) => handleChange(e, "followers")}
              isActive={tabOpened === "followers"}
            />
            {isUserCurrentUser && (
              <TabItem
                name="Following"
                onClick={(e) => handleChange(e, "following")}
                isActive={tabOpened === "following"}
              />
            )}
          </TabsList>
        </div>
        <Container>
          <div className={css.tabsContent}>
            <div className={css.tabContentActive}>
              {tabOpened === "recipes" && (
                <ListItems
                  items={userRecipes}
                  type="recipe"
                  errorText={errorMap.noRecipes}
                />
              )}
              {tabOpened === "favorites" && (
                <ListItems
                  items={userFavorites}
                  type="recipe"
                  errorText={errorMap.noFavorites}
                />
              )}
              {tabOpened === "followers" && (
                <ListItems
                  items={userFollowers}
                  type="user"
                  errorText={errorMap.noFollowers}
                />
              )}
              {tabOpened === "following" && (
                <ListItems
                  items={userFollowing}
                  type="user"
                  errorText={errorMap.noSubscriptions}
                />
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default UserPage;
