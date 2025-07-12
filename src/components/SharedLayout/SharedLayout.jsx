import React from "react";
import Container from "../Container/Container";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { Toaster } from "react-hot-toast";

const SharedLayout = ({ children }) => {
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
