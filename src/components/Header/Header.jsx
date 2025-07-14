import clsx from "clsx";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { openLogout, openSignIn, openSignUp } from "../../redux/auth/authSlice";
import AuthBar from "../AuthBar/AuthBar";
import Container from "../Container/Container";
import MobileSidebar from "../MobileSideBar/MobileSideBar";
import UserBar from "../UserBar/UserBar";
import styles from "./Header.module.css";

const Header = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isHome = location.pathname === "/";

  // Get auth state from Redux
  const userToken = useSelector((state) => state.auth.userToken);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const isAuthenticated = Boolean(userToken);
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
    <header
      className={clsx(
        styles.header,
        isHome ? styles.headerAbsolute : styles.headerFlex,
        !isHome && styles.headerDark,
      )}
    >
      <Container>
        <div className={styles.inner}>
          {/* Logo */}
          <Link to="/" className={clsx(styles.logo, !isHome && styles.logoDark)}>
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
                    className={clsx(
                      styles.navLink,
                      location.pathname === link.to && styles.navLinkActive,
                      !isHome && styles.navLinkDark,
                    )}
                  >
                    {link.label}
                  </Link>
                ),
            )}
          </nav>

          {/* AuthBar or UserBar */}
          {!isAuthenticated ? (
            <AuthBar
              onSignIn={handleSignIn}
              onSignUp={handleSignUp}
              isHome={isHome}
              className={clsx(styles.authBar, !isHome && styles.authBarDark)}
            />
          ) : (
            <UserBar
              user={user}
              onProfile={() => navigate("/user")}
              onLogout={handleLogOut}
              isHome={isHome}
              className={clsx(styles.userBar, !isHome && styles.userBarDark)}
            />
          )}

          {/* Burger menu for mobile */}
          <button
            className={clsx(styles.burger, !isHome && styles.burgerDark)}
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open navigation menu"
            type="button"
          >
            <svg width="28" height="28" className={styles.burgerIcon} fill="currentColor">
              <use href="src/assets/sprite.svg#icon-align-justify" />
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile Nav Overlay */}
      {mobileNavOpen && (
        <MobileSidebar
          open={mobileNavOpen}
          onClose={() => setMobileNavOpen(false)}
          navLinks={navLinks}
          isAuthenticated={isAuthenticated}
          location={location}
          isHome={isHome}
        />
      )}
    </header>
  );
};

export default Header;
