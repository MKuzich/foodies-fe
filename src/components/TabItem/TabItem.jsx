import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

import useMediaQuery from "../../hooks/useMediaQuery";
import css from "./TabItem.module.css";

const TabItem = ({ name, onClick, isActive }) => {
  const ref = useRef(null);
  const [isNeedScrollToStart, setIsNeedScrollToStart] = useState(false);
  const mq = useMediaQuery("(max-width: 1439px)");

  useEffect(() => {
    if (mq && isNeedScrollToStart && ref.current) {
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
