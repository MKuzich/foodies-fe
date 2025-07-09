import css from "./TabsList.module.css";

const TabsList = ({ children }) => {
  return (
    <div className={css.tabsList}>
      <div className={css.tabsScroll}>
        <ul className={css.tabsListItems}>{children}</ul>
      </div>
    </div>
  );
};

export default TabsList;
