import { useNavigate } from "react-router-dom";

import Button from "../Button/Button";
import HeroImages from "../HeroImages/HeroImages";
import styles from "./Hero.module.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <h1 className={styles.title}>
          IMPROVE YOUR
          <br />
          CULINARY TALENTS
        </h1>
        <p className={styles.subtitle}>
          Amazing recipes for beginners in the world of cooking, enveloping you in the aromas and
          tastes of various cuisines.
        </p>
        <Button
          onClick={() => navigate("/recipe/add")}
          type="link"
          outlined
          className={styles.ctaBtn}
        >
          Add Recipe
        </Button>
        <HeroImages />
      </div>
    </section>
  );
};

export default Hero;
