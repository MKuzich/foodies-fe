import React from "react";
import css from "./SharedLayout.module.css";
import Container from "../Container/Container";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../../redux/categories/actions";
import { useEffect } from "react";

const SharedLayout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

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
