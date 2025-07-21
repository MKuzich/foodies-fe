import clsx from "clsx";

import css from "./TabsList.module.css";

const TabsList = ({ children }) => {
  return (
    <div className={css.tabsList}>
      <div className={clsx(css.tabsScroll)}>
        <ul className={css.tabsListItems}>
          {children}
          <li className={css.tabSpacer} />
        </ul>
      </div>
    </div>
  );
};

export default TabsList;
