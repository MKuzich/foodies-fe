import Container from "../Container/Container";
import styles from "./Hero.module.css";

const Hero = () => (
  <section className={styles.hero}>
    <Container>
      <div className={styles.heroInner}>
        <h1 className={styles.title}>
          IMPROVE YOUR
          <br />
          CULINARY TALENTS
        </h1>
        <p className={styles.subtitle}>
          Amazing recipes for beginners in the world of cooking, enveloping you
          in the aromas and tastes of various cuisines.
        </p>

        <button className={styles.ctaBtn}>Add Recipe</button>

        <div className={styles.images}>
          <picture>
            <source
              srcSet="/img/cakemob@1x.webp 1x, /img/cakemob@2x.webp 2x"
              media="(max-width: 767px)"
              type="image/webp"
            />
            <source
              srcSet="/img/caketablet@1x.webp 1x, /img/caketablet@2x.webp 2x"
              media="(max-width: 1024px)"
              type="image/webp"
            />
            <source
              srcSet="/img/cakedesk@1x.webp 1x, /img/cakedesk@2x.webp 2x"
              media="(min-width: 1440px)"
              type="image/webp"
            />
            <img
              src="/img/cakedesk.png"
              alt="Cake dessert"
              className={`${styles.heroImg} ${styles.imgLeft}`}
            />
          </picture>
          <picture>
            <source
              srcSet="/img/beefmob@1x.webp 1x, /img/beefmob@2x.webp 2x"
              media="(max-width: 767px)"
              type="image/webp"
            />
            <source
              srcSet="/img/beeftablet@1x.webp 1x, /img/beeftablet@2x.webp 2x"
              media="(max-width: 1024px)"
              type="image/webp"
            />
            <source
              srcSet="/img/beefdesk@1x.webp 1x, /img/beefdesk@2x.webp 2x"
              media="(min-width: 1440px)"
              type="image/webp"
            />
            <img
              src="/img/beefdesk.png"
              alt="Beef dish"
              className={`${styles.heroImg} ${styles.imgRight}`}
            />
          </picture>
        </div>
      </div>
    </Container>
  </section>
);

export default Hero;
