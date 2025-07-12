import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AvatarIcon from '../AvatarIcon/AvatarIcon';
import styles from './Header.module.css';

const UserBar = ({ onProfile, onLogout, className = '' }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const user = useSelector(state => state.auth.userInfo) || { name: '', avatar: '' };

  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div className={`${styles.userBar} ${className}`} ref={ref}>
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
        />
        <span className={styles.userName}>{user.name}</span>
        <svg className={styles.chevronIcon} width="16" height="16">
          <use href="src/assets/sprite.svg#icon-chevron-down" />
        </svg>
      </button>
      {open && (
        <div className={styles.dropdown}>
          <button type="button" className={styles.dropdownItem} onClick={onProfile}>
            PROFILE
          </button>
          <button type="button" className={styles.dropdownItem} onClick={onLogout}>
            LOG OUT
            <svg className={styles.arrowIcon} width="18" height="18">
              <use href="src/assets/sprite.svg#icon-arrow-up-right" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserBar; 