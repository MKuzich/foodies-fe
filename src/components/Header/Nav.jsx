import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Nav = ({ isAuthenticated }) => (
  <nav className={styles.nav}>
    <NavLink
      to="/"
      className={({ isActive }) =>
        isActive
          ? `${styles.navLink} ${styles.navLinkOutlined}`
          : styles.navLink
      }
    >
      HOME
    </NavLink>
    {isAuthenticated && (
      <NavLink
        to="/add"
        className={({ isActive }) =>
          isActive
            ? `${styles.navLink} ${styles.navLinkOutlined}`
            : styles.navLink
        }
      >
        ADD RECIPE
      </NavLink>
    )}
  </nav>
);

export default Nav; 