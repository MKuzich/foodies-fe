import css from "./TabItem.module.css";

const TabItem = ({ name, isActive, onClick }) => {
  return (
    <div
      className={css.tabItem + (isActive ? " " + css.active : "")}
      onClick={onClick}
    >
      {name}
    </div>
  );
};

export default TabItem;
