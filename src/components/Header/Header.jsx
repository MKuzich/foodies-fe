import clsx from "clsx";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import useMediaQuery from "@/hooks/useMediaQuery";

import Icons from "../../assets/sprite.svg";
import { useAuth } from "../../hooks/useAuth";
import { openLogout, openSignIn, openSignUp } from "../../redux/auth/slice";
import AuthBar from "../AuthBar/AuthBar";
import Container from "../Container/Container";
import MobileSidebar from "../MobileSideBar/MobileSideBar";
import UserBar from "../UserBar/UserBar";
import css from "./Header.module.css";

const Header = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const isHome = location.pathname === "/";
  const { user: isAuthenticated } = useAuth();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const user = userInfo || { name: "", avatar: "" };
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1439px)");
  const shouldRenderNavItems = (isTablet && isAuthenticated) || !isTablet;

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
        css.header,
        isHome ? css.headerAbsolute : css.headerFlex,
        !isHome && css.headerDark,
      )}
    >
      <Container>
        <div className={css.inner}>
          <div className={css.centeringWrapper}>
            <Link to="/" className={clsx(css.logo, !isHome && css.logoDark)}>
              foodies
            </Link>
          </div>
          <nav className={css.nav}>
            {shouldRenderNavItems &&
              navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={clsx(
                    css.navLink,
                    location.pathname === link.to && css.navLinkActive,
                    !isHome && css.navLinkDark,
                  )}
                >
                  {link.label}
                </Link>
              ))}
          </nav>
          <div className={clsx(css.centeringWrapper, css.toEnd)}>
            {!isAuthenticated ? (
              <AuthBar
                onSignIn={handleSignIn}
                onSignUp={handleSignUp}
                isHome={isHome}
                className={clsx(css.authBar, !isHome && css.authBarDark)}
              />
            ) : (
              <UserBar
                user={user}
                onLogout={handleLogOut}
                isHome={isHome}
                className={clsx(css.userBar, !isHome && css.userBarDark)}
              />
            )}
            {isAuthenticated && (
              <button
                className={clsx(css.burger, !isHome && css.burgerDark)}
                onClick={() => setMobileNavOpen(true)}
                aria-label="Open navigation menu"
                type="button"
              >
                <svg className={css.burgerIcon} width="28" height="28">
                  <use href={`${Icons}#icon-align-justify`} />
                </svg>
              </button>
            )}
          </div>
        </div>
      </Container>
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
