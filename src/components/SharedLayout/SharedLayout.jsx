import React from "react";
import Container from "../Container/Container";
import Footer from "../Footer/Footer";

import Header from "../Header/Header";


const SharedLayout = ({ children }) => {



  return (
    <>
      <Header>
        <Container>Header</Container>
      </Header>
  
      <main>{children}</main>
      <Footer>
        <Container>Footer</Container>
      </Footer>
    </>
  );
};

export default SharedLayout;
