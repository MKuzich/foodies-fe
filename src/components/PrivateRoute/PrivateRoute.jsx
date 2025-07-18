import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import {
  openSignIn,
  selectAuthCanceled,
  selectNext,
  setAuthCanceled,
  setNext,
} from "../../redux/auth/slice";
import AuthLoader from "../AuthLoader/AuthLoader";

const PrivateRoute = ({ component: Component, redirectTo = "/" }) => {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const authCanceled = useSelector(selectAuthCanceled);
  const next = useSelector(selectNext);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    !user && (dispatch(setNext(location.pathname)), dispatch(openSignIn()));
  }, [dispatch, location]);

  useEffect(() => {
    if (next === "/") {
      navigate("/");
      dispatch(setAuthCanceled());
    }

    if (authCanceled && !user && !next) {
      navigate(redirectTo);
      dispatch(setAuthCanceled());
    }
  }, [authCanceled, navigate, next, user]);

  if (!user) {
    return <AuthLoader />;
  }

  return <Component />;
};

export default PrivateRoute;
