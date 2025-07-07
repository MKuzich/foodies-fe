import css from "./TabItem.module.css";

const TabItem = ({ name, active, onClick }) => {
  return (
    <div
      className={css.tabItem + (active ? " " + css.active : "")}
      onClick={onClick}
    >
      {name}
    </div>
  );
};

export default TabItem;
