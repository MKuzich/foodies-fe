import React from "react";
import Container from "../Container/Container";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

const SharedLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Breadcrumbs />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default SharedLayout;
