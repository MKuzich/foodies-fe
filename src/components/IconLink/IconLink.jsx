import { Link } from "react-router-dom";
import Icons from "../../assets/sprite.svg";
import clsx from "clsx";
import css from "./IconLink.module.css";

const IconLink = ({
  children,
  to,
  white,
  social,
  name,
  color,
  iconStyle,
  ...props
}) => {
  const iconNameMap = {
    arrow: "arrow-up-right",
    facebook: "facebook",
    instagram: "instagram",
    youtube: "youtube",
    chevron: "icon-chevron-down",
  };
  return (
    <Link
      to={to}
      {...props}
      className={clsx(css.iconLink, white && css.white, social && css.social)}
    >
      <svg
        className={clsx(
          css.iconLinkIcon,
          white && css.white,
          social && css.social
        )}
      >
        <use
          xlinkHref={`${Icons}#icon-${iconNameMap[name]}`}
          style={iconStyle}
        />
      </svg>
      {children}
    </Link>
  );
};

export default IconLink;
