import React from "react";
import css from "./Loader.module.css";
import clsx from "clsx";

const Loader = ({ isDark = true }) => {
  return (
    <div className={css.wrapper}>
      <div
        className={clsx(css.loader, isDark && css.dark, !isDark && css.light)}
      ></div>
    </div>
  );
};

export default Loader;
