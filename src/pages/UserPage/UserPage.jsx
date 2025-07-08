import React, { useState } from "react";
import { useEffect } from "react";
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
import css from "./UserPage.module.css";
import TabsContent from "../../components/TabsContent/TabsContent";
import ListItems from "../../components/ListItems/ListItems";
import {
  currentUserPageErrors,
  userPageErrors,
} from "../../utils/const/userPageErrors";
import {
  selectIsUserCurrentUser,
  selectIsUserIsFollowed,
  selectUserRecepies,
  selectUserFavorites,
  selectUserFollowers,
  selectUserFollowing,
} from "../../redux/users/selectors";
const UserPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(id));
  }, [dispatch, id]);
  const btnStyle = {
    marginTop: "20px",
    width: "100%",
  };
  const isUserCurrentUser = useSelector(selectIsUserCurrentUser);
  const isUserIsFollowed = useSelector(selectIsUserIsFollowed);
  const userRecepies = useSelector(selectUserRecepies);
  const userFavorites = useSelector(selectUserFavorites);
  const userFollowers = useSelector(selectUserFollowers);
  const userFollowing = useSelector(selectUserFollowing);
  const openLogoutModal = () => {};
  const errorMap = isUserCurrentUser ? currentUserPageErrors : userPageErrors;

  const [tabOpened, setTabOpened] = useState("1");
  const handleChange = (newValue) => {
    console.log("newValue of tab", newValue);
    setTabOpened(newValue);
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
          <Button onClick={openLogoutModal} style={btnStyle}>
            Log out
          </Button>
        ) : isUserIsFollowed ? (
          <Button onClick={openLogoutModal} style={btnStyle}>
            Unfollow
          </Button>
        ) : (
          <Button onClick={openLogoutModal} style={btnStyle}>
            Follow
          </Button>
        )}
      </Container>
      <div className={css.tabsContainer}>
        <TabsList>
          {isUserCurrentUser ? (
            <TabItem
              name="My recepies"
              isActive={tabOpened === "1"}
              onClick={() => handleChange("1")}
            />
          ) : (
            <TabItem
              name="recepies"
              isActive={tabOpened === "1"}
              onClick={() => handleChange("1")}
            />
          )}
          {isUserCurrentUser && (
            <TabItem
              name="My Favorites"
              isActive={tabOpened === "2"}
              onClick={() => handleChange("2")}
            />
          )}
          {isUserCurrentUser && (
            <TabItem
              name="Following"
              isActive={tabOpened === "3"}
              onClick={() => handleChange("3")}
            />
          )}
          <TabItem
            name="Followers"
            isActive={tabOpened === "4"}
            onClick={() => handleChange("4")}
          />
        </TabsList>
        <Container>
          <div className={css.tabsContent}>
            <TabsContent isActive={tabOpened === "1"}>
              <ListItems
                items={userRecepies}
                type="recipe"
                errorText={errorMap.noRecipes}
              />
            </TabsContent>
            <TabsContent isActive={tabOpened === "2"}>
              <ListItems
                items={userFavorites}
                type="recipe"
                errorText={errorMap.noFavorites}
              />
            </TabsContent>
            <TabsContent isActive={tabOpened === "3"}>
              <ListItems
                items={userFollowers}
                type="user"
                errorText={errorMap.noFollowers}
              />
            </TabsContent>
            <TabsContent isActive={tabOpened === "4"}>
              <ListItems
                items={userFollowing}
                type="user"
                errorText={errorMap.noSubscriptions}
              />
            </TabsContent>
          </div>
        </Container>
      </div>
    </>
  );
};

export default UserPage;
