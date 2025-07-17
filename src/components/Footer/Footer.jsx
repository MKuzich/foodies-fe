import { Link } from "react-router-dom";

import Container from "../Container/Container";
import IconLink from "../IconLink/IconLink";
import styles from "./Footer.module.css";

const getCurrentYear = () => new Date().getFullYear();

const Footer = () => (
  <footer className={styles.footer}>
    <Container>
      <div className={styles.topRow}>
        <Link to="/" className={styles.logo}>
          foodies
        </Link>
        <nav className={styles.networkLinks} aria-label="Social media links">
          <IconLink
            to="https://www.facebook.com/goITclub/"
            name="facebook"
            social
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          />
          <IconLink
            to="https://www.instagram.com/goitclub/"
            name="instagram"
            social
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          />
          <IconLink
            to="https://www.youtube.com/c/GoIT"
            name="youtube"
            social
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          />
        </nav>
      </div>
      <div className={styles.divider} />
      <div className={styles.copyright}>
        &#xa9; {getCurrentYear()}, Foodies. All rights reserved
      </div>
    </Container>
  </footer>
);

export default Footer;
