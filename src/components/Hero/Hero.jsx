import Container from "../Container/Container";
import styles from "./Hero.module.css";
import Button from "../Button/Button";
import HeroImages from "../HeroImages/HeroImages";

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

        <HeroImages />
      </Container>
    </div>
  </section>
);

export default Hero;
