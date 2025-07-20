import clsx from "clsx";

import css from "./Loader.module.css";

const Loader = ({ isDark = true }) => {
  return (
    <div className={css.wrapper}>
      <div className={clsx(css.loader, isDark && css.dark, !isDark && css.light)}></div>
    </div>
  );
};

export default Loader;
