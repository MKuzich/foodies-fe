import css from "./AvatarIcon.module.css";
import clsx from "clsx";

const AvatarIcon = ({ src, alt, name, xsmall, small, medium, large }) => {
  const iconClassName = clsx(
    css.avatarIcon,
    xsmall && css.xsmall,
    small && css.small,
    medium && css.medium,
    large && css.large
  );

  const getAvatarName = (name) => {
    if (!name) return "F";
    if (name.length === 1) return name;
    return name[0];
  };
  const imgAlt = name ? `Profile picture of user ${name}` : alt;
  const avatarName = getAvatarName(name);
  return src ? (
    <img src={src} alt={imgAlt} className={iconClassName} />
  ) : (
    <div className={iconClassName}>{avatarName}</div>
  );
};

export default AvatarIcon;
