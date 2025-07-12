import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openSignIn, openSignUp, openLogout } from "../../redux/auth/authSlice";

import Container from "../Container/Container";
import AuthBar from "./AuthBar";
import UserBar from "./UserBar";
import styles from "./Header.module.css";

const Header = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isHome = location.pathname === "/";

  // Get auth state from Redux
  const userToken = useSelector(state => state.auth.userToken);
  const userInfo = useSelector(state => state.auth.userInfo);
  const isAuthenticated = Boolean(userToken );
  const user = userInfo || { name: "", avatar: "" };

  const handleSignIn = () => {
    dispatch(openSignIn());
  };
  const handleSignUp = () => {
    dispatch(openSignUp());
  };
  const handleLogOut = () => {
    dispatch(openLogout());
  };

  const navLinks = [
    { to: "/", label: "Home", private: false },
    { to: "/recipe/add", label: "Add Recipe", private: true },
  ];

  return (
    <header className={`${styles.header} ${!isHome ? styles.headerDark : ""}  ${isHome ? styles.headerAbsolute : styles.headerFlex}`}>
      <Container>
        <div className={styles.inner}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            foodies
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.nav}>
            {navLinks.map(
              (link) =>
                (!link.private || isAuthenticated) && (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={
                      location.pathname === link.to
                        ? `${styles.navLink} ${styles.navLinkActive}`
                        : styles.navLink
                    }
                  >
                    {link.label}
                  </Link>
                )
            )}
          </nav>

          {/* AuthBar or UserBar */}
          {!isAuthenticated ? (
            <AuthBar
              onSignIn={handleSignIn}
              onSignUp={handleSignUp}
              className={styles.authBar}
            />
          ) : (
            <UserBar
              user={user}
              onProfile={() => navigate("/user")}
              onLogout={handleLogOut}
              className={styles.userBar}
            />
          )}

          {/* Burger menu for mobile */}
          {isAuthenticated && (
            <button
              className={styles.burger}
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open navigation menu"
              type="button"
            >
              <svg width="28" height="28" className={styles.burgerIcon}>
                <use href="src/assets/sprite.svg#icon-align-justify" />
              </svg>
            </button>
          )}
        </div>
      </Container>

      {/* Mobile Nav Overlay */}
      {isAuthenticated && mobileNavOpen && (
        <div
          className={styles.mobileNavOverlay}
          onClick={() => setMobileNavOpen(false)}
        >
          <nav
            className={styles.mobileNav}
            onClick={(e) => e.stopPropagation()}
            aria-label="Mobile navigation"
          >
            <button
              type="button"
              onClick={() => setMobileNavOpen(false)}
              className={styles.mobileClose}
              aria-label="Close navigation menu"
            >
              <svg width="28" height="28" fill="currentColor">
                <use href="src/assets/sprite.svg#icon-x" />
              </svg>
            </button>
            {navLinks.map(
              (link) =>
                (!link.private || isAuthenticated) && (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={
                      location.pathname === link.to
                        ? `${styles.navLink} ${styles.navLinkActive}`
                        : styles.navLink
                    }
                    onClick={() => setMobileNavOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
