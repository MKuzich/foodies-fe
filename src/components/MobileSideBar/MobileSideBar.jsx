import clsx from "clsx";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import Icons from "../../assets/sprite.svg";
import Container from "../Container/Container";
import HeroImages from "../HeroImages/HeroImages";
import css from "./MobileSideBar.module.css";

const MobileSidebar = ({ open, onClose, navLinks, isAuthenticated, isHome = true }) => {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  // simple focus‐trap: keep focus inside the panel
  useEffect(() => {
    if (!open || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll < HTMLElement > "a, button:not([disabled])";
    const first = focusable[0],
      last = focusable[focusable.length - 1];

    const trap = (e) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    panelRef.current.addEventListener("keydown", trap);
    first?.focus();

    return () => {
      panelRef.current?.removeEventListener("keydown", trap);
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <button
        type="button"
        aria-label="Close navigation menu"
        className={css.backdrop}
        onClick={onClose}
      />

      <aside ref={panelRef} role="dialog" aria-modal="true" className={css.mobileNavHero}>
        <Container className={css.mobileContainer}>
          <div className={css.sidebarHeader}>
            <Link to="/" className={css.logo} onClick={onClose}>
              foodies
            </Link>
            <button
              type="button"
              onClick={onClose}
              className={css.mobileClose}
              aria-label="Close navigation menu"
            >
              <svg className={css.mobileCloseIcon} fill="currentColor" width="28" height="28">
                <use href={`${Icons}#icon-x`} />
              </svg>
            </button>
          </div>

          <nav>
            <ul className={css.mobileNavButtons}>
              {navLinks.map((link) =>
                !link.private || isAuthenticated ? (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className={clsx(
                        css.mobileNavButton,
                        link.private && "private",
                        !isHome && css.mobileNavButtonDark,
                      )}
                      onClick={onClose}
                    >
                      {link.label}
                    </Link>
                  </li>
                ) : null,
              )}
            </ul>
          </nav>

          <HeroImages />
        </Container>
      </aside>
    </>
  );
};

export default MobileSidebar;
