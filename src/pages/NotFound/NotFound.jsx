import Button from "../../components/Button/Button";
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

        <Button to="/" isLink>
          Go to Homepage
        </Button>
      </Container>
    </>
  );
};

export default NotFound;
