import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { openSignIn, selectCurrentUser, setNext } from "../../redux/auth/slice";
import { getAvatarName } from "../../utils/helpers";
import css from "./AvatarIcon.module.css";

const AvatarIcon = ({
  src,
  avatarURL,
  avatar,
  alt,
  name,
  xsmall,
  small,
  medium,
  large,
  to = null,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const curentUser = useSelector(selectCurrentUser);

  const handleOpenSignIn = (e) => {
    e.preventDefault();
    if (!curentUser) {
      dispatch(setNext(to));
      dispatch(openSignIn());
      return;
    }
    navigate(to);
  };

  const iconClassName = clsx(
    css.avatarIcon,
    xsmall && css.xsmall,
    small && css.small,
    medium && css.medium,
    large && css.large,
  );

  const imageSrc = src || avatarURL || avatar || null;

  const imgAlt = name ? `Profile picture of user ${name}` : alt;
  const avatarName = getAvatarName(name);

  return (
    <>
      {to ? (
        <Link to={to} className={css.link} onClick={handleOpenSignIn}>
          {imageSrc ? (
            <img loading="lazy" src={imageSrc} alt={imgAlt} className={iconClassName} />
          ) : (
            <div className={iconClassName}>{avatarName}</div>
          )}
        </Link>
      ) : (
        <div className={css.link}>
          {imageSrc ? (
            <img loading="lazy" src={imageSrc} alt={imgAlt} className={iconClassName} />
          ) : (
            <div className={iconClassName}>{avatarName}</div>
          )}
        </div>
      )}
    </>
  );
};

export default AvatarIcon;
