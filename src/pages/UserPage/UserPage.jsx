import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
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
import { openLogout, selectUserInfo } from "../../redux/auth/slice";
import { selectError, selectLoading } from "../../redux/root/selectors";
import {
  fetchUser,
  fetchUserFavorites,
  fetchUserFollowers,
  fetchUserFollowing,
  fetchUserRecipes,
  fetchUserTestimonials,
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
  selectUsersUserLoading,
  selectUserTestimonials,
} from "../../redux/users/selectors";
import { changePage, changeTab } from "../../redux/users/slice";
import { currentUserPageErrors, userPageErrors } from "../../utils/const/userPageErrors";
import NotFound from "../NotFound/NotFound";
import css from "./UserPage.module.css";
import UserPageSkeleton from "./UserPageSkeleton";

const UserPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const userRendered = useRef(false);
  const userTab = useRef(null);

  const loading = useSelector(selectUsersUserLoading);
  const isLoading = useSelector(selectLoading);
  const [buttonLoading, setButtonLoading] = useState(false);
  const error = useSelector(selectError);

  const isUserExists = useSelector(selectUserExists);
  const currentUserInfo = useSelector(selectUserInfo);
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
  const userTestimonials = useSelector(selectUserTestimonials);

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
    tabOpened === "following" &&
      isUserCurrentUser &&
      dispatch(fetchUserFollowing({ id, ...filter }));
    tabOpened === "testimonials" &&
      isUserCurrentUser &&
      dispatch(fetchUserTestimonials({ userId: id, ...filter }));
  }, [dispatch, filter, tabOpened]);

  useEffect(() => {
    if (!userTab.current) return;
    if (!userRendered.current) return;
    if (currentPage === 1) {
      userRendered.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
      return;
    }
    userTab.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }, [currentPage]);

  const recepieTabName = isUserCurrentUser ? "My recepies" : "recepies";
  const errorMap = isUserCurrentUser ? currentUserPageErrors : userPageErrors;

  const handleFollowClick = async () => {
    setButtonLoading(true);
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
    setButtonLoading(false);
  };
  return (
    <>
      {isUserExists ? (
        <>
          <PathInfo name={"Profile"} />
          <section className={css.section} ref={userRendered}>
            <div className={css.container}>
              <MainTitle>Profile</MainTitle>
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
                          disabled={buttonLoading}
                          appendClassName={clsx(css.btn, buttonLoading && css.btnLoadingActive)}
                        >
                          Log out
                        </Button>
                      ) : isUserIsFollowed ? (
                        <Button
                          onClick={handleFollowClick}
                          disabled={buttonLoading}
                          appendClassName={clsx(css.btn, buttonLoading && css.btnLoadingActive)}
                        >
                          Unfollow
                        </Button>
                      ) : (
                        <Button
                          onClick={handleFollowClick}
                          disabled={buttonLoading}
                          appendClassName={clsx(css.btn, buttonLoading && css.btnLoadingActive)}
                        >
                          Follow
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className={css.tabsContainer}>
                <div className={css.tabsWrapper} ref={userTab}>
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
                    {isUserCurrentUser && (
                      <TabItem
                        name="My reviews"
                        onClick={() => dispatch(changeTab("testimonials"))}
                        isActive={tabOpened === "testimonials"}
                      />
                    )}
                  </TabsList>
                </div>
                <div className={css.container}>
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
                      {tabOpened === "testimonials" && (
                        <ListItems
                          items={userTestimonials}
                          type="testimonial"
                          errorText={errorMap.noTestimonials}
                        />
                      )}
                    </div>
                    {totalPages > 1 && (
                      <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        isLoading={isLoading}
                        onClick={(newValue) => dispatch(changePage(newValue))}
                        borders
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : loading ? (
        <UserPageSkeleton isUserCurrentUser={currentUserInfo?.id === parseInt(id)} />
      ) : (
        error && <NotFound />
      )}
    </>
  );
};

export default UserPage;
