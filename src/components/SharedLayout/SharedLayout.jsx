import React from "react";
import css from "./SharedLayout.module.css";
import Container from "../Container/Container";
import { Toaster } from "react-hot-toast";

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
      <Toaster />
    </>
  );
};

export default SharedLayout;
