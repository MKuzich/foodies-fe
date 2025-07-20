import clsx from "clsx";
import { Link } from "react-router-dom";

import Icons from "../../assets/sprite.svg";
import css from "./IconLink.module.css";

const IconLink = ({
  children,
  to,
  black,
  white,
  social,
  name,
  iconStyle,
  className,
  disabled,
  ...props
}) => {
  const iconNameMap = {
    arrow: "arrow-up-right",
    facebook: "facebook",
    instagram: "instagram",
    youtube: "youtube",
  };
  return (
    <Link
      to={to}
      {...props}
      className={clsx(
        css.iconLink,
        black && css.black,
        white && css.white,
        social && css.social,
        disabled && css.disabled,
        className,
      )}
    >
      <svg
        className={clsx(
          css.iconLinkIcon,
          black && css.black,
          white && css.white,
          social && css.social,
          disabled && css.disabled,
        )}
      >
        <use xlinkHref={`${Icons}#icon-${iconNameMap[name]}`} style={iconStyle} />
      </svg>
      {children}
    </Link>
  );
};

export default IconLink;
