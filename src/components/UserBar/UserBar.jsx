import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import AvatarIcon from "../AvatarIcon/AvatarIcon";
import styles from "./UserBar.module.css";
import clsx from "clsx";

const UserBar = ({ onProfile, onLogout, className = "", isHome = true }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const user = useSelector((state) => state.auth.userInfo) || {
    name: "",
    avatar: "",
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
    <div className={clsx(styles.userBar, className)} ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={styles.userBarBtn}
      >
        <AvatarIcon
          src={user.avatar}
          name={user.name}
          alt="avatar"
          className={styles.avatar}
          small
        />
        <span className={styles.userName}>{user.name}</span>
        <svg className={styles.chevronIcon} width="16" height="16">
          <use href="src/assets/sprite.svg#icon-chevron-down" />
        </svg>
      </button>
      {open && (
        <div className={clsx(
          styles.dropdown,
          !isHome && styles.dropdownDark
        )}>
          <button
            type="button"
            className={clsx(
              styles.dropdownItem,
              !isHome && styles.dropdownItemDark
            )}
            onClick={onProfile}
          >
            PROFILE
          </button>
          <button
            type="button"
            className={clsx(
              styles.dropdownItem,
              !isHome && styles.dropdownItemDark
            )}
            onClick={onLogout}
          >
            LOG OUT
            <svg className={clsx(
              styles.arrowIcon,
              !isHome && styles.arrowIconDark
            )} width="18" height="18">
              <use href="src/assets/sprite.svg#icon-arrow-up-right" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserBar;
