import clsx from "clsx";

import Icons from "../../assets/sprite.svg";
import css from "./IconButton.module.css";

const IconButton = ({
  children,
  name,
  iconStyle,
  onClick,
  disabled,
  className,
  iconClass,
  ...props
}) => {
  const iconNameMap = {
    like: "heart",
    trash: "trash",
    plus: "plus",
    minus: "minus",
    arrowUpRight: "arrow-up-right",
  };
  return (
    <button
      {...props}
      disabled={disabled}
      onClick={onClick}
      className={clsx(css.iconButton, className, disabled && css.disabled)}
    >
      <svg className={clsx(css.iconButtonIcon, iconClass)}>
        <use xlinkHref={`${Icons}#icon-${iconNameMap[name]}`} style={iconStyle} />
      </svg>
      {children}
    </button>
  );
};

export default IconButton;
