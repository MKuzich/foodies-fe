import clsx from "clsx";
import React from "react";

import css from "./Button.module.css";

const Button = ({
  children,
  outlinedInactive,
  outlined,
  inactive,
  isLink,
  appendClassName,
  onClick,
  ...props
}) => {
  const handleClick = (e) => {
    e.currentTarget.blur();
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <>
      {isLink ? (
        <a
          className={clsx(
            css.btn,
            outlined && css.outlined,
            outlinedInactive && css.outlinedInactive,
            inactive && css.inactive,
            appendClassName,
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
            outlinedInactive && css.outlinedInactive,
            inactive && css.inactive,
            appendClassName,
          )}
          onClick={handleClick}
          {...props}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
