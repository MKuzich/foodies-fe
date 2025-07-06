import React from "react";
import css from "./SharedLayout.module.css";
import Container from "../Container/Container";

const SharedLayout = ({ children }) => {
  return (
    <>
      <header>
        <Container>Header</Container>
      </header>
      <main>{children}</main>
      <footer>
        <Container>Footer</Container>
      </footer>
    </>
  );
};

export default SharedLayout;
