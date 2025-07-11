import css from "./TabItem.module.css";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { smoothScrollLeft } from "../../utils/helpers";

const TabItem = ({ name, onClick, isActive }) => {
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
          smoothScrollLeft(parent, parent.scrollLeft - 16, 400); // px to move current tab from start page after click
        }
      }, 400);

      setIsNeedScrollToStart(false);
    }
  }, [isNeedScrollToStart]); // TODO: move to custom hook ?

  const handleClick = (e) => {
    onClick(e);
    setIsNeedScrollToStart(true);
  };

  return (
    <li className={css.tabItem} ref={isNeedScrollToStart ? ref : null}>
      <button
        className={clsx(css.tabItemLink, isActive && css.active)}
        onClick={handleClick}
      >
        {name}
      </button>
    </li>
  );
};

export default TabItem;
