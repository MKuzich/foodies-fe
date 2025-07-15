import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import { fetchCategories } from "../../redux/categories/actions";
// import css from "./SharedLayout.module.css";
//import Container from "../Container/Container";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const SharedLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

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
