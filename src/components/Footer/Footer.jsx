import styles from './Footer.module.css';
import Container from '../Container/Container';
import IconLink from '../IconLink/IconLink';

const Footer = () => (
  <footer className={styles.footer}>
    <Container>
      <div className={styles.topRow}>
        <div className={styles.logo}>foodies</div>
        <nav className={styles.networkLinks} aria-label="Social media links">
          <IconLink
            to="https://facebook.com"
            name="facebook"
            social
            className={styles.iconBtn}
            target="_blank"
            
            rel="noopener noreferrer"
            aria-label="Facebook"
          />
          <IconLink
            to="https://instagram.com"
            name="instagram"
            social
            className={styles.iconBtn}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          />
          <IconLink
            to="https://youtube.com"
            name="youtube"
            social
            className={styles.iconBtn}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          />
        </nav>
      </div>
      <div className={styles.divider} />
      <div className={styles.copyright}>
        &copy;2024, Foodies. All rights reserved
      </div>
    </Container>
  </footer>
);

export default Footer;
