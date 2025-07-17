import Button from "../Button/Button";
import HeroImages from "../HeroImages/HeroImages";
import css from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={css.hero}>
      <div className={css.heroInner}>
        <h1 className={css.title}>
          IMPROVE YOUR
          <br />
          CULINARY TALENTS
        </h1>
        <p className={css.subtitle}>
          Amazing recipes for beginners in the world of cooking, enveloping you in the aromas and
          tastes of various cuisines.
        </p>
        <Button href="/recipe/add" isLink appendClassName={css.ctaBtn}>
          Add Recipe
        </Button>
        <HeroImages />
      </div>
    </section>
  );
};

export default Hero;
