import React from "react";
import Container from "../Container/Container";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";

import { useDispatch } from "react-redux";
import { fetchCategories } from "../../redux/categories/actions";
import { useEffect } from "react";

import { Toaster } from "react-hot-toast";

const SharedLayout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <>

      <Header />

      <Toaster />

      <main>{children}</main>
      <Footer />

    </>
  );
};

export default SharedLayout;
