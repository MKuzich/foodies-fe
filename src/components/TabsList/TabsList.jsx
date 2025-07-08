import css from "./TabsList.module.css";

const TabsList = ({ children }) => {
  return (
    <div className={css.tabsList}>
      <div className={css.tabsScroll}>
        <div className={css.tabsListItems}>{children}</div>
      </div>
    </div>
  );
};

export default TabsList;
