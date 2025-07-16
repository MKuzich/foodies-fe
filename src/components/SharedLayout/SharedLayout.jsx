import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

// import css from "./SharedLayout.module.css";
//import Container from "../Container/Container";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const SharedLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
};

export default SharedLayout;
