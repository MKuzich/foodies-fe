import Icons from "../../assets/sprite.svg";
import clsx from "clsx";
import css from "./IconButton.module.css";

const IconButton = ({
  children,
  name,
  color,
  iconStyle,
  onClick,
  like,
  trash,
  disabled,
  ...props
}) => {
  const iconNameMap = {
    like: "heart",
    trash: "trash",
    plus: "plus",
    minus: "minus",
  };
  return (
    <button
      {...props}
      disabled={disabled}
      onClick={onClick}
      className={clsx(css.iconButton, disabled && css.disabled)}
    >
      <svg className={clsx(css.iconButtonIcon)}>
        <use
          xlinkHref={`${Icons}#icon-${iconNameMap[name]}`}
          style={iconStyle}
        />
      </svg>
      {children}
    </button>
  );
};

export default IconButton;
