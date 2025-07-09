import styles from './Footer.module.css';
import Container from '../Container/Container';

const socialLinks = [
  {
    href: 'https://facebook.com',
    label: 'Facebook',
    icon: 'icon-facebook',
  },
  {
    href: 'https://instagram.com',
    label: 'Instagram',
    icon: 'icon-instagram',
  },
  {
    href: 'https://youtube.com',
    label: 'YouTube',
    icon: 'icon-youtube',
  },
];

const Footer = () => (
  <footer className={styles.footer}>
    <Container>
      <div className={styles.topRow}>
        <div className={styles.logo}>foodies</div>
        <nav className={styles.networkLinks} aria-label="Social media links">
          {socialLinks.map(({ href, label, icon }) => (
            <a
              key={icon}
              href={href}
              className={styles.iconBtn}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
            >
              <svg width="20" height="20" aria-hidden="true">
                <use href={`src/assets/sprite.svg#${icon}`} />
              </svg>
            </a>
          ))}
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
