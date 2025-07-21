import { ReactTyped } from "react-typed";

import Button from "../Button/Button";
import HeroImages from "../HeroImages/HeroImages";
import css from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={css.hero}>
      <div className={css.heroInner}>
        <h1 className={css.title}>
          <span style={{ whiteSpace: "pre-line", display: "inline-block" }}>
            <ReactTyped
              strings={["IMPROVE YOUR", "IMPROVE YOUR\nCULINARY TALENTS"]}
              typeSpeed={50}
              backSpeed={30}
              backDelay={1000}
              startDelay={0}
              loop={false}
              showCursor={false}
            />
          </span>
        </h1>
        <p className={css.subtitle}>
          Amazing recipes for beginners in the world of cooking, enveloping you in the aromas and
          tastes of various cuisines.
        </p>
        <Button to="/recipe/add" isLink appendClassName={css.ctaBtn}>
          Add Recipe
        </Button>
        <HeroImages />
      </div>
    </section>
  );
};

export default Hero;
