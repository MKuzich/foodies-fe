import React from "react";
import styles from "./HeroImages.module.css";

const HeroImages = () => (
  <div className={styles.images}>
    <img
      src="/img/panacota.png"
      srcSet="/img/panacota.png 1x, /img/panacota@2x.png 2x, /img/panacota@3x.png 3x"
      alt="Panacota dessert"
      className={`${styles.heroImg} ${styles.imgLeft}`}
    />
    <img
      src="/img/beef.png"
      srcSet="/img/beef.png 1x, /img/beef@2x.png 2x, /img/beef@3x.png 3x"
      alt="Beef dish"
      className={`${styles.heroImg} ${styles.imgRight}`}
    />
  </div>
);

export default HeroImages;
