import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { refreshUser } from "./redux/auth/authActions";
import "./App.css";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import Loader from "./components/Loader/Loader";
import AuthModals from "./components/AuthModals";
import css from "./App.module.css";

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
          <Route path="/user/:id" element={<User />} />
          <Route path="/recipe/add" element={<AddPecipe />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <AuthModals />
    </SharedLayout>
  );
}

export default App;
