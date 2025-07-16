import clsx from "clsx";
import { useSelector } from "react-redux";

import { selectLoading } from "../../redux/root/selectors";
import RecipePreview from "../RecipePreview/RecipePreview";
import UserCard from "../UserCard/UserCard";
import css from "./ListItems.module.css";

const ListItems = ({ items, type, errorText, following, favorite }) => {
  const isLoading = useSelector(selectLoading);
  return (
    <div className={css.listItemsWrap}>
      {items?.length === 0 && !isLoading ? (
        <p className={css.errorText}>{errorText}</p>
      ) : (
        <ul className={clsx(css.listItems, css[type])}>
          {items.map((item) => {
            if (type === "recipe") {
              return <RecipePreview key={item.id} recipe={item} favorite={favorite} />;
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
