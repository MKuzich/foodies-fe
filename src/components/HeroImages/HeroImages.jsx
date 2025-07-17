import styles from "./HeroImages.module.css";

const HeroImages = () => (
  <div className={styles.images}>
    <img
      src="/img/panacota.webp"
      srcSet="
        /img/panacota.webp 1x,
        /img/panacota@2x.webp 2x,
        /img/panacota@3x.webp 3x
      "
      type="image/webp"
      alt="Panacota dessert"
      className={`${styles.heroImg} ${styles.imgLeft}`}
    />
    <img
      src="/img/beef.webp"
      srcSet="
        /img/beef.webp 1x,
        /img/beef@2x.webp 2x,
        /img/beef@3x.webp 3x
      "
      type="image/webp"
      alt="Beef dish"
      className={`${styles.heroImg} ${styles.imgRight}`}
    />
  </div>
);

export default HeroImages;
