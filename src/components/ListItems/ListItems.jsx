import RecipePreview from "../RecipePreview/RecipePreview";
import UserCard from "../UserCard/UserCard";
import css from "./ListItems.module.css";

const ListItems = ({ items, type, errorText }) => {
  return (
    <div>
      {items.length === 0 ? (
        <p className={css.errorText}>{errorText}</p>
      ) : (
        items.map((item) => {
          if (type === "recipe") {
            return <RecipePreview key={item.id} recipe={item} />;
          }
          if (type === "user") {
            return <UserCard key={item.id} user={item} />;
          }
        })
      )}
    </div>
  );
};

export default ListItems;
