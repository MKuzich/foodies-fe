import css from "./TabItem.module.css";
import clsx from "clsx";
import { Link } from "react-router-dom";

const TabItem = ({ name, isActive, to }) => {
  return (
    <li className={clsx(css.tabItem, isActive && css.active)}>
      <Link to={to} className={css.tabItemLink}>
        {name}
      </Link>
    </li>
  );
};

export default TabItem;
