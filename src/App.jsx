import "./App.css";

import { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import css from "./App.module.css";
import AuthModals from "./components/AuthModals";
import Loader from "./components/Loader/Loader";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import { refreshUser } from "./redux/auth/authActions";

const Home = lazy(() => import("./pages/HomePage/HomePage"));
const User = lazy(() => import("./pages/UserPage/UserPage"));
const AddPecipe = lazy(() => import("./pages/AddRecipePage/AddRecipePage"));
const Recipe = lazy(() => import("./pages/RecipePage/RecipePage"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <SharedLayout>
      <Suspense
        fallback={
          <div className={css.loaderWrapper}>
            <Loader />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:id" element={<PrivateRoute component={User} />} />
          <Route path="/recipe/add" element={<PrivateRoute component={AddPecipe} />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <AuthModals />
    </SharedLayout>
  );
}

export default App;
