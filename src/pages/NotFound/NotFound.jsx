import React from "react";
import css from "./NotFound.module.css";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import MainTitle from "../../components/MainTitle/MainTitle";

const NotFound = () => {
  return (
    <Container className={css.notFoundContainer}>
      <h1 className={css.title}>404</h1>
      <MainTitle>Page Not Found</MainTitle>
      <p className={css.text}>
        The page you are looking for does not exist or has been moved.
      </p>
      <p className={css.suggestion}>
        Please check the URL or return to the homepage.
      </p>

      <Button isLink href="/">
        Go to Homepage
      </Button>
    </Container>
  );
};

export default NotFound;
