import css from "./TabItem.module.css";
import Button from "../Button/Button";
import clsx from "clsx";

const TabItem = ({ name, isActive, onClick }) => {
  return (
    <li className={clsx(css.tabItem, isActive && css.active)}>
      <Button onClick={onClick} className={css.tabItemButton}>
        {name}
      </Button>
    </li>
  );
};

export default TabItem;
