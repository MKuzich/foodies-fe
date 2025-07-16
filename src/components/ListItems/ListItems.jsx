import clsx from "clsx";

import RecipePreview from "../RecipePreview/RecipePreview";
import UserCard from "../UserCard/UserCard";
import css from "./ListItems.module.css";

const ListItems = ({ items, type, errorText, following, isFavorite }) => {
  return (
    <div className={css.listItemsWrap}>
      {!items || items.length === 0 ? (
        <p className={css.errorText}>{errorText}</p>
      ) : (
        <ul className={clsx(css.listItems, css[type])}>
          {items.map((item) => {
            if (type === "recipe") {
              return <RecipePreview key={item.id} recipe={item} isFavorite={isFavorite} />;
            }
            if (type === "user") {
              return <UserCard key={item.id} user={item} following={following} />; // TODO : remove following props after BE fix
            }
          })}
        </ul>
      )}
    </div>
  );
};

export default ListItems;
