import React from "react";
import css from "./Container.module.css";
import clsx from "clsx";

const Container = ({ children, className, ...props }) => {
  return (
    <div className={clsx(css.container, className && className)} {...props}>
      {children}
    </div>
  );
};

export default Container;
