import clsx from "clsx";

import ListItems from "../../components/ListItems/ListItems";
import MainTitle from "../../components/MainTitle/MainTitle";
import skeletonCss from "../../components/Skeleton/Skeleton.module.css";
import Subtitle from "../../components/Subtitle/Subtitle";
import TabItem from "../../components/TabItem/TabItem";
import TabsList from "../../components/TabsList/TabsList";
import UserInfoSkeleton from "../../components/UserInfo/UserInfoSkeleton";
import css from "./UserPage.module.css";

const UserPageSkeleton = () => {
  return (
    <section className={css.section}>
      <div className={css.container}>
        <MainTitle>profile</MainTitle>
        <Subtitle>
          Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces
          with us.
        </Subtitle>
      </div>
      <div className={css.userProfile}>
        <div className={clsx(css.userProfile, css.container)}>
          <div className={css.userProfileInfo}>
            <UserInfoSkeleton />
            <div className={css.followButtonContainer}>
              <div className={css.followButtonWrapper}>
                <div
                  className={clsx(
                    skeletonCss.skeleton,
                    skeletonCss.skeletonButton,
                    skeletonCss.medium,
                  )}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className={css.tabsContainer}>
          <div className={css.tabsWrapper}>
            <TabsList>
              <TabItem name="Recipes" />
              <TabItem name="Followers" />
            </TabsList>
          </div>
          <div className={css.container}>
            <div className={css.tabsContent}>
              <div className={css.tabContentActive}>
                <ListItems type="recipe" skeletonMode />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserPageSkeleton;
