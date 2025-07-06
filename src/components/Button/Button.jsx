import React from "react";
import clsx from "clsx";
import css from "./Button.module.css";

const Button = (
  { children, handler = () => {}, outlined = false, ...props },
  type = "button"
) => {
  return (
    <button
      type={type}
      className={clsx(css.btn, outlined && css.outlined)}
      onClick={handler}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
