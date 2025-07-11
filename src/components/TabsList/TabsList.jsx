import { useEffect, useRef } from "react";
import css from "./TabsList.module.css";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { toggleScrolling } from "../../redux/users/slice";
import { selectIsScrolling } from "../../redux/users/selectors";

const TabsList = ({ children }) => {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let timeout;
    const onScroll = () => {
      dispatch(toggleScrolling(true));
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        dispatch(toggleScrolling(false));
      }, 250);
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [dispatch]); // TODO: move to custom hook ?

  const isScrolling = useSelector(selectIsScrolling);
  return (
    <div className={css.tabsList}>
      <div
        className={clsx(css.tabsScroll, isScrolling && css.isScrolling)}
        ref={scrollRef}
      >
        <ul className={css.tabsListItems}>
          {children}
          <li className={css.tabSpacer} />
        </ul>
      </div>
    </div>
  );
};

export default TabsList;
