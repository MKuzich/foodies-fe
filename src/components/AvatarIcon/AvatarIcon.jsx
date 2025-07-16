import clsx from "clsx";
import { Link } from "react-router-dom";

import css from "./AvatarIcon.module.css";

const AvatarIcon = ({ src, alt, name, xsmall, small, medium, large, to = null }) => {
  const iconClassName = clsx(
    css.avatarIcon,
    xsmall && css.xsmall,
    small && css.small,
    medium && css.medium,
    large && css.large,
  );

  const getAvatarName = (name) => {
    if (!name) return "F";
    if (name.length === 1) return name;
    return name[0];
  };
  const imgAlt = name ? `Profile picture of user ${name}` : alt;
  const avatarName = getAvatarName(name);

  return (
    <>
      {to ? (
        <Link to={to}>
          {src ? (
            <img src={src} alt={imgAlt} className={iconClassName} />
          ) : (
            <div className={iconClassName}>{avatarName}</div>
          )}
        </Link>
      ) : (
        <div>
          {src ? (
            <img src={src} alt={imgAlt} className={iconClassName} />
          ) : (
            <div className={iconClassName}>{avatarName}</div>
          )}
        </div>
      )}
    </>
  );
};

export default AvatarIcon;
