import { Link, useLocation } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";
import Container from "../Container/Container";

const BREADCRUMB_NAMES = {
  "add-recipe": "Add Recipe",
  profile: "Profile",
  user: "User",
  // To do: add more mappings as needed
};

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  // Don't render on home page
  if (pathnames.length === 0) return null;

  return (
    <Container>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        {pathnames.map((segment, idx) => {
          const to = "/" + pathnames.slice(0, idx + 1).join("/");
          const isLast = idx === pathnames.length - 1;
          const name =
            BREADCRUMB_NAMES[segment] ||
            segment.replace(/-/g, " ").toUpperCase();

          return (
            <span key={to} className={isLast ? styles.active : ""}>
              {!isLast ? (
                <>
                  <Link to={to}>{name}</Link>
                  <span className={styles.separator}>/</span>
                </>
              ) : (
                name
              )}
            </span>
          );
        })}
      </nav>
    </Container>
  );
}
