import { Link } from "react-router-dom";

import btnCss from "../../components/Button/Button.module.css";
import Container from "../../components/Container/Container";
import MainTitle from "../../components/MainTitle/MainTitle";
import Meta from "../../components/Meta/Meta";
import PathInfo from "../../components/PathInfo/PathInfo";
import css from "./NotFound.module.css";

const NotFound = () => {
  return (
    <>
      <Meta
        title="Page Not Found"
        description="The page you are looking for does not exist or has been moved."
      />
      <PathInfo name="Not Found" />
      <Container className={css.notFoundContainer}>
        <h1 className={css.title}>404</h1>
        <MainTitle>Page Not Found</MainTitle>
        <p className={css.text}>The page you are looking for does not exist or has been moved.</p>
        <p className={css.suggestion}>Please check the URL or return to the homepage.</p>

        <Link to="/" className={btnCss.btn}>
          Go to Homepage
        </Link>
      </Container>
    </>
  );
};

export default NotFound;
