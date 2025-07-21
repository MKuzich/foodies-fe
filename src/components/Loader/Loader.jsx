import clsx from "clsx";

import css from "./Loader.module.css";

const Loader = ({ isDark = true, large = false }) => {
  return (
    <div className={css.wrapper}>
      <div
        className={clsx(css.loader, isDark && css.dark, !isDark && css.light, large && css.large)}
      ></div>
    </div>
  );
};

export default Loader;
