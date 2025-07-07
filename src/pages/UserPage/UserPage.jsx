import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

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
  const isUserCurrentUser = true;
  const isUserIsFollowed = true;
  const openLogoutModal = () => {};

  const [tabOpened, setTabOpened] = useState("1");
  const handleChange = (newValue) => {
    console.log("newValue of tab", newValue);
    setTabOpened(newValue);
  };

  return (
    <Container>
      <PathInfo pathName={"home"} currentName={"profile"} />
      <MainTitle text="profile" />
      <Subtitle text="Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us." />
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

      <TabsList>
        {isUserCurrentUser ? (
          <TabItem
            name="My recepies"
            active={tabOpened === "1"}
            onClick={() => handleChange("1")}
          />
        ) : (
          <TabItem
            name="recepies"
            active={tabOpened === "1"}
            onClick={() => handleChange("1")}
          />
        )}
        {isUserCurrentUser && (
          <TabItem
            name="My Favorites"
            active={tabOpened === "2"}
            onClick={() => handleChange("2")}
          />
        )}
        {isUserCurrentUser && (
          <TabItem
            name="Following"
            active={tabOpened === "3"}
            onClick={() => handleChange("3")}
          />
        )}
        <TabItem
          name="Followers"
          active={tabOpened === "4"}
          onClick={() => handleChange("4")}
        />
      </TabsList>
      <div className={css.tabsContent}>
        <h3>{tabOpened}</h3>
      </div>
    </Container>
  );
};

export default UserPage;
