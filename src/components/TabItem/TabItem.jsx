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
      const isFirstChild =
        currentRef === currentRef.parentElement.firstElementChild;

      setIsNeedScrollToStart(false);

      if (!currentRef || isFirstChild) return;
      setTimeout(() => {
        const parent = currentRef.parentElement?.parentElement;
        if (parent) {
          smoothScrollLeft(parent, parent.scrollLeft - 100, 400);
          // 100px to move current tab from start page after click
        }
      }, 400);
    }
  }, [isNeedScrollToStart]);

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
