import Container from "../Container/Container";
import styles from "./Hero.module.css";
import Button from "../Button/Button";

const Hero = () => (
  <section className={styles.hero}>
    <div className={styles.heroInner}>
      <Container>
        <h1 className={styles.title}>
          IMPROVE YOUR
          <br />
          CULINARY TALENTS
        </h1>
        <p className={styles.subtitle}>
          Amazing recipes for beginners in the world of cooking, enveloping you
          in the aromas and tastes of various cuisines.
        </p>
        <Button
          onClick={() => console.log("Button clicked!")}
          type="link"
          outlined
          className={styles.ctaBtn}
        >
          Add Recipe
        </Button>

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
      </Container>
    </div>
  </section>
);

export default Hero;
