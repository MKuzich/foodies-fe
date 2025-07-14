import clsx from "clsx";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  fetchUserFavorites,
  fetchUserFollowers,
  fetchUserFollowing,
  fetchUserRecipes,
} from "../../api/users";
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
import { setActiveLoading, setInactiveLoading } from "../../redux/root/slice";
import { fetchUser, followUser, unfollowUser } from "../../redux/users/operations";
import {
  selectIsUserCurrentUser,
  selectIsUserIsFollowed,
  selectUserExists,
} from "../../redux/users/selectors";
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

  const [tabOpened, setTabOpened] = useState("recipes");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [userRecipes, setUserRecipes] = useState(null);
  const [userFavorites, setUserFavorites] = useState(null);
  const [userFollowers, setUserFollowers] = useState(null);
  const [userFollowing, setUserFollowing] = useState(null);

  useEffect(() => {
    setPage(1);
    setTotalPages(0);
    setUserRecipes(null);
    setUserFavorites(null);
    setUserFollowers(null);
    setUserFollowing(null);
    setTabOpened("recipes");
    dispatch(fetchUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    const fetchRecipes = async () => {
      dispatch(setActiveLoading());
      try {
        const recipes = await fetchUserRecipes(id, page);
        setUserRecipes(recipes.data);
        setTotalPages(recipes.pagination.pages);
      } catch (error) {
        setUserRecipes(null);
        toast.error(`Error loading recipes: ${error.message}`);
      } finally {
        dispatch(setInactiveLoading());
      }
    };
    if (tabOpened === "recipes") fetchRecipes();
  }, [id, tabOpened, page]);

  useEffect(() => {
    const fetchFavorites = async () => {
      dispatch(setActiveLoading());
      try {
        const favorites = await fetchUserFavorites(id, page);
        setUserFavorites(favorites.data);
        setTotalPages(favorites.pagination.pages);
      } catch (error) {
        setUserFavorites(null);
        toast.error(`Error loading favorites: ${error.message}`);
      } finally {
        dispatch(setInactiveLoading());
      }
    };
    if (tabOpened === "favorites" && isUserCurrentUser) fetchFavorites();
  }, [id, tabOpened, page, isUserCurrentUser]);

  useEffect(() => {
    const fetchFollowers = async () => {
      dispatch(setActiveLoading());
      try {
        const followers = await fetchUserFollowers(id, page);
        setUserFollowers(followers.results);
        setTotalPages(followers.pagination.pages);
      } catch (error) {
        setUserFollowers(null);
        toast.error(`Error loading followers: ${error.message}`);
      } finally {
        dispatch(setInactiveLoading());
      }
    };
    if (tabOpened === "followers") fetchFollowers();
  }, [id, tabOpened, page]);

  useEffect(() => {
    const fetchFollowing = async () => {
      dispatch(setActiveLoading());
      try {
        const following = await fetchUserFollowing(id, page);
        setUserFollowing(following.results);
        setTotalPages(following.pagination.pages);
      } catch (error) {
        setUserFollowing(null);
        toast.error(`Error loading following: ${error.message}`);
      } finally {
        dispatch(setInactiveLoading());
      }
    };
    if (tabOpened === "following" && isUserCurrentUser) fetchFollowing();
  }, [id, tabOpened, page, isUserCurrentUser]);

  const recepieTabName = isUserCurrentUser ? "My recepies" : "recepies";
  const errorMap = isUserCurrentUser ? currentUserPageErrors : userPageErrors;

  // since we need to update the followers list when following or unfollowing
  // may be there is a better way to do this
  // use redux for this ?

  const handleFollowClick = async () => {
    if (isUserIsFollowed) {
      await dispatch(unfollowUser(id));
      toast.success("Successfully unfollowed from this user!");
    } else {
      await dispatch(followUser(id));
      toast.success("Successfully followed to this user!");
    }
    if (tabOpened === "followers") {
      setPage(1);
      setTotalPages(0);
      const followers = await fetchUserFollowers(id, page);
      setUserFollowers(followers.results);
    }
  };

  const handleChange = (e, newValue) => {
    setPage(1);
    setTabOpened(newValue);
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
                      <Button onClick={() => dispatch(openLogout())} style={{ width: "100%" }}>
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

            <div className={css.tabsContainer}>
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
                      />
                    )}
                  </div>
                  {!isLoading && totalPages > 1 && (
                    <Pagination
                      totalPages={totalPages}
                      currentPage={page}
                      onClick={setPage}
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
