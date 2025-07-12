import { Link } from "react-router-dom";
import HeroImages from "../HeroImages/HeroImages";
import styles from "./MobileSideBar.module.css";
import clsx from "clsx";

const MobileSidebar = ({ open, onClose, navLinks, isAuthenticated, isHome = true }) => {
  if (!open) return null;

  return (
    <div className={styles.mobileNavOverlay} onClick={onClose}>
      <div
        className={clsx(
          styles.mobileNavHero,
          !isHome && styles.mobileNavHeroDark
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.sidebarHeader}>
          <Link 
            to="/" 
            className={clsx(
              styles.logo,
              !isHome && styles.logoDark
            )} 
            onClick={onClose}
          >
            foodies
          </Link>
          <button
            type="button"
            onClick={onClose}
            className={clsx(
              styles.mobileClose,
              !isHome && styles.mobileCloseDark
            )}
            aria-label="Close navigation menu"
          >
            <svg 
              width="28" 
              height="28" 
              fill="currentColor"
              className={clsx(
                styles.mobileCloseIcon,
                !isHome && styles.mobileCloseIconDark
              )}
            >
              <use href="src/assets/sprite.svg#icon-x" />
            </svg>
          </button>
        </div>
        <div className={styles.mobileNavButtons}>
          {navLinks.map(
            (link) =>
              (!link.private || isAuthenticated) && (
                <Link
                  key={link.to}
                  to={link.to}
                  className={clsx(
                    styles.mobileNavButton,
                    link.private ? "private" : "",
                    !isHome && styles.mobileNavButtonDark
                  )}
                  onClick={onClose}
                >
                  {link.label}
                </Link>
              )
          )}
        </div>
        <HeroImages />
      </div>
    </div>
  );
};

export default MobileSidebar;
