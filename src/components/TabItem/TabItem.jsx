import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

import css from "./TabItem.module.css";

const TabItem = ({ name, onClick, isActive }) => {
  const ref = useRef(null);
  const [isNeedScrollToStart, setIsNeedScrollToStart] = useState(false);

  useEffect(() => {
    if (isNeedScrollToStart && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      const currentRef = ref.current;
      const isFirstChild = currentRef === currentRef.parentElement.firstElementChild;

      setIsNeedScrollToStart(false);

      if (!currentRef || isFirstChild) return;
    }
  }, [isNeedScrollToStart]);

  const handleClick = (e) => {
    e.currentTarget.blur();
    onClick(e);
    setIsNeedScrollToStart(true);
  };

  return (
    <li className={css.tabItem} ref={isNeedScrollToStart ? ref : null}>
      <button className={clsx(css.tabItemLink, isActive && css.active)} onClick={handleClick}>
        {name}
      </button>
    </li>
  );
};

export default TabItem;
