import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import css from "./TabItem.module.css";
import { useSelector } from "react-redux";
import { selectIsScrolling } from "../../redux/users/selectors";
import { useRef, useEffect, useState } from "react";
import { smoothScrollLeft } from "../../utils/helpers";

const TabItem = ({ name, to, activeOnlyBasePath }) => {
  const isScrolling = useSelector(selectIsScrolling);

  const ref = useRef(null);
  const [isNeedScrollToStart, setIsNeedScrollToStart] = useState(false);

  useEffect(() => {
    if (isNeedScrollToStart && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
      const currentRef = ref.current;
      setTimeout(() => {
        const parent = currentRef.parentElement?.parentElement;
        if (parent) {
          smoothScrollLeft(parent, parent.scrollLeft - 16, 400);
        }
      }, 400);

      setIsNeedScrollToStart(false);
    }
  }, [isNeedScrollToStart]); // TODO: move to custom hook ?

  const buildLinkClass = ({ isActive }) => {
    if (activeOnlyBasePath === false) {
      return clsx(css.tabItemLink, isScrolling && css.isScrolling);
    }
    return clsx(
      css.tabItemLink,
      isActive && css.active,
      isScrolling && css.isScrolling
    );
  };
  return (
    <li className={css.tabItem} ref={isNeedScrollToStart ? ref : null}>
      <NavLink
        to={to}
        className={buildLinkClass}
        onClick={() => setIsNeedScrollToStart(true)}
      >
        {name}
      </NavLink>
    </li>
  );
};

export default TabItem;
