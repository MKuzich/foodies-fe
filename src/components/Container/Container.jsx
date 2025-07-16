import clsx from "clsx";

import css from "./Container.module.css";

const Container = ({ children, className, ...props }) => {
  return (
    <div className={clsx(css.container, className && className)} {...props}>
      {children}
    </div>
  );
};

export default Container;
