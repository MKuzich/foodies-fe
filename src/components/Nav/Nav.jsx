import { NavLink, useLocation } from "react-router-dom";

import styles from "./Header.module.css";

const Nav = ({ isAuthenticated }) => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isAddRecipe = location.pathname === "/recipe/add";

  return (
    <nav className={styles.nav}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? `${styles.navLink} ${styles.navLinkActive}`
            : `${styles.navLink} ${isAddRecipe ? styles.navLinkNoBorder : ""}`
        }
        end
      >
        HOME
      </NavLink>
      {isAuthenticated && (
        <NavLink
          to="/recipe/add"
          className={({ isActive }) =>
            isActive
              ? `${styles.navLink} ${styles.navLinkActive}`
              : `${styles.navLink} ${isHome ? styles.navLinkNoBorder : ""}`
          }
        >
          ADD RECIPE
        </NavLink>
      )}
    </nav>
  );
};

export default Nav;
