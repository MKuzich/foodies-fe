import css from "./TabsList.module.css";

const TabsList = ({ children }) => {
  return (
    <div className={css.tabsList}>
      <div className={css.tabsScroll}>{children}</div>
    </div>
  );
};

export default TabsList;
