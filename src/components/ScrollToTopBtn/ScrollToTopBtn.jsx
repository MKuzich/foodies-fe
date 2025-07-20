import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

import IconButton from "../IconButton/IconButton";
import css from "./ScrollToTopBtn.module.css";

const ScrollToTopBtn = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const pageHeight = document.documentElement.scrollHeight;
      const oneThirdOfPage = pageHeight / 3;
      const scrollTop = window.scrollY;

      setIsVisible(scrollTop > oneThirdOfPage);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <IconButton
      ref={ref}
      onClick={scrollToTop}
      className={clsx(css.scrollToTopBtn, isVisible && css.visible)}
      name="arrowUpRight"
      iconClass={css.iconButtonIcon}
    />
  );
};

export default ScrollToTopBtn;
