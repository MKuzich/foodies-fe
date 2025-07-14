import clsx from "clsx";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import HeroImages from "../HeroImages/HeroImages";
import styles from "./MobileSideBar.module.css";

const MobileSidebar = ({ open, onClose, navLinks, isAuthenticated, isHome = true }) => {
  const panelRef = useRef(null);

  // close on Escape & lock scroll
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
      {/* BACKDROP as a full‐screen button */}
      <button
        type="button"
        aria-label="Close navigation menu"
        className={styles.backdrop}
        onClick={onClose}
      />

      {/* SIDEBAR PANEL */}
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        className={clsx(styles.mobileNavHero, !isHome && styles.mobileNavHeroDark)}
      >
        <div className={styles.sidebarHeader}>
          <Link to="/" className={clsx(styles.logo, !isHome && styles.logoDark)} onClick={onClose}>
            foodies
          </Link>
          <button
            type="button"
            onClick={onClose}
            className={clsx(styles.mobileClose, !isHome && styles.mobileCloseDark)}
            aria-label="Close navigation menu"
          >
            <svg
              width="28"
              height="28"
              fill="currentColor"
              className={clsx(styles.mobileCloseIcon, !isHome && styles.mobileCloseIconDark)}
            >
              <use href="src/assets/sprite.svg#icon-x" />
            </svg>
          </button>
        </div>

        <nav>
          <ul className={styles.mobileNavButtons}>
            {navLinks.map((link) =>
              !link.private || isAuthenticated ? (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={clsx(
                      styles.mobileNavButton,
                      link.private && "private",
                      !isHome && styles.mobileNavButtonDark,
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
      </aside>
    </>
  );
};

export default MobileSidebar;
