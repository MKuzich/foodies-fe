import RecipePreview from "../RecipePreview/RecipePreview";
import UserCard from "../UserCard/UserCard";
import css from "./ListItems.module.css";
import clsx from "clsx";

const ListItems = ({ items, type, errorText }) => {
  return (
    <div className={css.listItemsWrap}>
      {!items || items.length === 0 ? (
        <p className={css.errorText}>{errorText}</p>
      ) : (
        <ul className={clsx(css.listItems, css[type])}>
          {items.map((item) => {
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
