import React from "react";
import clsx from "clsx";
import css from "./Button.module.css";

const Button = ({ children, outlined, inactive, isLink, ...props }) => {
  return (
    <>
      {isLink ? (
        <a
          className={clsx(
            css.btn,
            outlined && css.outlined,
            inactive && css.inactive
          )}
          {...props}
        >
          {children}
        </a>
      ) : (
        <button
          className={clsx(
            css.btn,
            outlined && css.outlined,
            inactive && css.inactive
          )}
          {...props}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
