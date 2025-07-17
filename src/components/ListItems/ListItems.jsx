import clsx from "clsx";
import { useSelector } from "react-redux";

import {
  selectItemsCount,
  selectUsersFollowLoading,
  selectUsersRecipesLoading,
} from "../../redux/users/selectors";
import { getSkeletons } from "../../utils/helpers";
import RecipePreview from "../RecipePreview/RecipePreview";
import RecipePreviewSkeleton from "../RecipePreview/RecipePreviewSkeleton";
import UserCard from "../UserCard/UserCard";
import UserCardSkeleton from "../UserCard/UserCardSkeleton";
import css from "./ListItems.module.css";

const ListItems = ({ items, type, errorText, skeletonMode }) => {
  const isRecipesLoading = useSelector(selectUsersRecipesLoading);
  const isFollowLoading = useSelector(selectUsersFollowLoading);
  const itemsCount = useSelector(selectItemsCount);

  return (
    <div className={css.listItemsWrap}>
      {items?.length === 0 && !isRecipesLoading && !isFollowLoading ? (
        <p className={css.errorText}>{errorText}</p>
      ) : (
        <ul className={clsx(css.listItems, css[type])}>
          {skeletonMode || isRecipesLoading || isFollowLoading
            ? getSkeletons(itemsCount).map((skeleton) => {
                if (type === "recipe") {
                  return <RecipePreviewSkeleton key={skeleton.id} />;
                }
                if (type === "user") {
                  return <UserCardSkeleton key={skeleton.id} />;
                }
              })
            : items.map((item) => {
                if (type === "recipe") {
                  return <RecipePreview key={item.id} recipe={item} />;
                }
                if (type === "user") {
                  return <UserCard key={item.id} user={item} />;
                }
              })}
        </ul>
      )}
    </div>
  );
};

export default ListItems;
