import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ScrollToTopBtn from "../ScrollToTopBtn/ScrollToTopBtn";

const SharedLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopBtn />
      <Toaster />
    </>
  );
};

export default SharedLayout;
