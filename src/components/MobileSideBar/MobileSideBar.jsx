import { Link } from "react-router-dom";
import HeroImages from "../HeroImages/HeroImages";
import styles from "./MobileSideBar.module.css";

const MobileSidebar = ({ open, onClose, navLinks, isAuthenticated }) => {
  if (!open) return null;

  return (
    <div className={styles.mobileNavOverlay} onClick={onClose}>
      <div
        className={styles.mobileNavHero}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.sidebarHeader}>
          <Link to="/" className={styles.logo} onClick={onClose}>
            foodies
          </Link>
          <button
            type="button"
            onClick={onClose}
            className={styles.mobileClose}
            aria-label="Close navigation menu"
          >
            <svg width="28" height="28" fill="currentColor">
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
                  className={`${styles.mobileNavButton} ${
                    link.private ? "private" : ""
                  }`}
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
