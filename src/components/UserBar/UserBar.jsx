import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Icons from "../../assets/sprite.svg";
import AvatarIcon from "../AvatarIcon/AvatarIcon";
import css from "./UserBar.module.css";

const UserBar = ({ onLogout, className = "", isHome = true }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const user = useSelector((state) => state.auth.userInfo) || {
    name: "",
    avatar: "",
    id: "",
  };

  const onLogoutHandler = (e) => {
    e.currentTarget.blur();
    onLogout();
  };

  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className={clsx(css.userBar, className)} ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={clsx(css.userBarBtn, !isHome && css.userBarBtnDark)}
      >
        <AvatarIcon
          src={user.avatarURL}
          name={user.name}
          alt="avatar"
          className={css.avatar}
          small
        />
        <span className={css.userName}>{user.name.split(" ")[0]}</span>
        <svg className={clsx(css.chevronIcon, open && css.openedIcon)} width="18" height="18">
          <use href={`${Icons}#icon-chevron-down`} />
        </svg>
      </button>
      {open && (
        <div className={clsx(css.dropdown, !isHome && css.dropdownDark)}>
          <Link
            className={clsx(css.dropdownItem, !isHome && css.dropdownItemDark)}
            to={`/user/${user.id}`}
            onClick={(e) => {
              e.currentTarget.blur();
              setOpen(false);
            }}
          >
            PROFILE
          </Link>
          <button
            type="button"
            className={clsx(css.dropdownItem, !isHome && css.dropdownItemDark)}
            onClick={onLogoutHandler}
          >
            LOG OUT
            <svg
              className={clsx(css.arrowIcon, !isHome && css.arrowIconDark)}
              width="18"
              height="18"
            >
              <use href={`${Icons}#icon-link-icon`} />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserBar;
