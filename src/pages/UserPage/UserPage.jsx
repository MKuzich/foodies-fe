import clsx from "clsx";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Button from "../../components/Button/Button";
import ListItems from "../../components/ListItems/ListItems";
import MainTitle from "../../components/MainTitle/MainTitle";
import Pagination from "../../components/Pagination/Pagination";
import PathInfo from "../../components/PathInfo/PathInfo";
import Subtitle from "../../components/Subtitle/Subtitle";
import TabItem from "../../components/TabItem/TabItem";
import TabsList from "../../components/TabsList/TabsList";
import UserInfo from "../../components/UserInfo/UserInfo";
import { openLogout } from "../../redux/auth/authSlice";
import { selectError, selectLoading } from "../../redux/root/selectors";
import {
  fetchUser,
  fetchUserFavorites,
  fetchUserFollowers,
  fetchUserFollowing,
  fetchUserRecipes,
  followUser,
  unfollowUser,
} from "../../redux/users/operations";
import {
  selectFilter,
  selectIsUserCurrentUser,
  selectIsUserIsFollowed,
  selectPage,
  selectTabOpened,
  selectTotalPages,
  selectUserExists,
  selectUserFavorites,
  selectUserFollowers,
  selectUserFollowing,
  selectUserRecipes,
} from "../../redux/users/selectors";
import { changePage, changeTab } from "../../redux/users/slice";
import { currentUserPageErrors, userPageErrors } from "../../utils/const/userPageErrors";
import NotFound from "../NotFound/NotFound";
import css from "./UserPage.module.css";

const UserPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const isUserExists = useSelector(selectUserExists);
  const isUserCurrentUser = useSelector(selectIsUserCurrentUser);
  const isUserIsFollowed = useSelector(selectIsUserIsFollowed);
  const tabOpened = useSelector(selectTabOpened);
  const currentPage = useSelector(selectPage);
  const filter = useSelector(selectFilter);
  const totalPages = useSelector(selectTotalPages);

  const userRecipes = useSelector(selectUserRecipes);
  const userFavorites = useSelector(selectUserFavorites);
  const userFollowers = useSelector(selectUserFollowers);
  const userFollowing = useSelector(selectUserFollowing);

  useEffect(() => {
    dispatch(changeTab("recipes"));
    dispatch(fetchUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    tabOpened === "recipes" && dispatch(fetchUserRecipes({ id, ...filter }));
    tabOpened === "favorites" &&
      isUserCurrentUser &&
      dispatch(fetchUserFavorites({ id, ...filter }));
    tabOpened === "followers" && dispatch(fetchUserFollowers({ id, ...filter }));
    tabOpened === "following" && isUserCurrentUser && dispatch(fetchUserFollowing());
  }, [dispatch, filter, tabOpened, isUserCurrentUser]);

  const recepieTabName = isUserCurrentUser ? "My recepies" : "recepies";
  const errorMap = isUserCurrentUser ? currentUserPageErrors : userPageErrors;

  const handleFollowClick = async () => {
    if (isUserIsFollowed) {
      const result = await dispatch(unfollowUser(id));
      if (unfollowUser.fulfilled.match(result)) {
        toast.success("Successfully unfollowed from this user!");
      } else {
        toast.error(result.payload.message || "Failed to unfollow user");
      }
    } else {
      const result = await dispatch(followUser(id));
      if (followUser.fulfilled.match(result)) {
        toast.success("Successfully followed to this user!");
      } else {
        toast.error(result.payload.message || "Failed to follow user");
      }
    }
  };

  return (
    <>
      {isUserExists ? (
        <section className={css.section}>
          <div className={css.container}>
            <PathInfo pathName={"home"} currentName={"profile"} />
            <MainTitle>profile</MainTitle>
            <Subtitle>
              Reveal your culinary art, share your favorite recipe and create gastronomic
              masterpieces with us.
            </Subtitle>
          </div>
          <div className={css.userProfile}>
            <div className={clsx(css.userProfile, css.container)}>
              <div className={css.userProfileInfo}>
                <UserInfo />
                <div className={css.followButtonContainer}>
                  <div className={css.followButtonWrapper}>
                    {isUserCurrentUser ? (
                      <Button
                        onClick={() => dispatch(openLogout())}
                        disabled={isLoading}
                        style={{ width: "100%" }}
                      >
                        Log out
                      </Button>
                    ) : isUserIsFollowed ? (
                      <Button
                        onClick={handleFollowClick}
                        disabled={isLoading}
                        style={{ width: "100%" }}
                      >
                        Unfollow
                      </Button>
                    ) : (
                      <Button
                        onClick={handleFollowClick}
                        disabled={isLoading}
                        style={{ width: "100%" }}
                      >
                        Follow
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className={css.tabsContainer}>
              <div className={css.tabsWrapper}>
                <TabsList>
                  <TabItem
                    name={recepieTabName}
                    onClick={() => dispatch(changeTab("recipes"))}
                    isActive={tabOpened === "recipes"}
                  />
                  {isUserCurrentUser && (
                    <TabItem
                      name="My Favorites"
                      onClick={() => dispatch(changeTab("favorites"))}
                      isActive={tabOpened === "favorites"}
                    />
                  )}
                  <TabItem
                    name="Followers"
                    onClick={() => dispatch(changeTab("followers"))}
                    isActive={tabOpened === "followers"}
                  />
                  {isUserCurrentUser && (
                    <TabItem
                      name="Following"
                      onClick={() => dispatch(changeTab("following"))}
                      isActive={tabOpened === "following"}
                    />
                  )}
                </TabsList>
              </div>
              <div className={css.container}>
                <div className={css.tabsContent}>
                  <div className={css.tabContentActive}>
                    {tabOpened === "recipes" && (
                      <ListItems items={userRecipes} type="recipe" errorText={errorMap.noRecipes} />
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
                        following
                      />
                      // TODO : remove following props after BE fix
                    )}
                  </div>
                  {totalPages > 1 && (
                    <Pagination
                      totalPages={totalPages}
                      currentPage={currentPage}
                      onClick={(newValue) => dispatch(changePage(newValue))}
                      borders
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        !isLoading && error && <NotFound />
      )}
    </>
  );
};

export default UserPage;
