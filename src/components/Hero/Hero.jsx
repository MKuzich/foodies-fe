import Container from '../Container/Container';
import styles from './Hero.module.css';

// Placeholder for authentication status. Replace with your real auth logic.
const isAuthenticated = false;

const Hero = () => (
  <section className={styles.hero}>
    <Container>
      <div className={styles.heroInner}>
        <h1 className={styles.title}>IMPROVE YOUR<br />CULINARY TALENTS</h1>
        <p className={styles.subtitle}>
          Amazing recipes for beginners in the world of cooking, enveloping you in the aromas and tastes of various cuisines.
        </p>
        {!isAuthenticated && (
          <button className={styles.ctaBtn}>Add Recipe</button>
        )}
        <div className={styles.images}>
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
            alt="Dish 1"
            className={`${styles.heroImg} ${styles.imgLeft}`}
          />
          <img
            src="https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80"
            alt="Dish 2"
            className={`${styles.heroImg} ${styles.imgRight}`}
          />
        </div>
      </div>
    </Container>
  </section>
);

export default Hero;
