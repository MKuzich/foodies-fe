import React from "react";
// import css from "./SharedLayout.module.css";
import Container from "../Container/Container";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../../redux/categories/actions";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Footer from "../Footer/Footer";

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
     <Footer/>
      <Toaster />
    </>
  );
};

export default SharedLayout;
