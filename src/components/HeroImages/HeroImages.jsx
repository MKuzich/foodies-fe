import styles from "./HeroImages.module.css";

const HeroImages = () => (
  <div className={styles.images}>
    <picture className={`${styles.heroImg} ${styles.imgLeft}`}>
      <source
        media="(max-width: 374px)"
        type="image/webp"
        srcSet={`
          /img/cakemob.webp 1x,
          /img/cakemob@2x.webp 2x,
        `}
      />
      <source
        media="(min-width: 768px)"
        type="image/webp"
        srcSet={`
          /img/cakedesk.webp 1x,
          /img/cakedesk@2x.webp 2x,
        `}
      />
      <source
        media="(min-width: 1440px)"
        type="image/webp"
        srcSet={`
          /img/cakedesk.webp 1x,
          /img/cakedesk@2x.webp 2x,
        `}
      />
      <img src="/img/cakedesk.webp" alt="Panacota dessert" />
    </picture>

    <picture className={`${styles.heroImg} ${styles.imgRight}`}>
      <source
        media="(max-width: 374px)"
        type="image/webp"
        srcSet={`
          /img/beefmob.webp 1x,
          /img/beefmob@2x.webp 2x,
        `}
      />
      <source
        media="(min-width: 768px)"
        type="image/webp"
        srcSet={`
          /img/beefdesk.webp 1x,
          /img/beefdesk@2x.webp 2x,
        `}
      />
      <source
        media="(min-width: 1440px)"
        type="image/webp"
        srcSet={`
          /img/beefdesk.webp 1x,
          /img/beefdesk@2x.webp 2x,
        `}
      />
      <img src="/img/beefdesk.webp" alt="Beef dish" />
    </picture>
  </div>
);

export default HeroImages;
