import React from "react";
import PathInfo from "../../components/PathInfo/PathInfo";
import MainTitle from "../../components/MainTitle/MainTitle";
import Subtitle from "../../components/Subtitle/Subtitle";
import UserInfo from "../../components/UserInfo/UserInfo";

import TabsList from "../../components/TabsList/TabsList";
import TabItem from "../../components/TabItem/TabItem";
import Button from "../../components/Button/Button";

const UserPage = () => {
  const isUserCurrentUser = true;
  const isUserIsFollowed = true;
  const openLogoutModal = () => {};

  return (
    <>
      <PathInfo pathName={"home"} currentName={"profile"} />
      <MainTitle text="profile" />
      <Subtitle text="Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us." />
      <UserInfo />
      {isUserCurrentUser ? (
        <Button onClick={openLogoutModal}>Logout</Button>
      ) : isUserIsFollowed ? (
        <Button onClick={openLogoutModal}>Unfollow</Button>
      ) : (
        <Button onClick={openLogoutModal}>Follow</Button>
      )}
      <TabsList>
        {isUserCurrentUser ? (
          <TabItem name="My recepies" />
        ) : (
          <TabItem name="recepies" />
        )}
        {isUserCurrentUser && <TabItem name="My Favorites" />}
        {isUserCurrentUser && <TabItem name="Following" />}
        <TabItem name="Followers" />
      </TabsList>
    </>
  );
};

export default UserPage;
