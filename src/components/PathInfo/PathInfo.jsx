import { Link } from "react-router-dom";

import Container from "../Container/Container";
import css from "./PathInfo.module.css";

const PathInfo = ({ name }) => {
  return (
    <Container className={css.pathInfo}>
      <nav className={css.breadcrumbs} aria-label="Breadcrumb">
        <span>
          <Link to="/">Home</Link>
          <span className={css.separator}>/</span>
          <span className={css.active}>{name}</span>
        </span>
      </nav>
    </Container>
  );
};

export default PathInfo;
