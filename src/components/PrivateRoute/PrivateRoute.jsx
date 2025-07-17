import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { closeAuthCanceled, openSignIn, selectAuthCanceled } from "../../redux/auth/slice";

const PrivateRoute = ({ component: Component, redirectTo = "/" }) => {
  const { user } = useAuth();
  const authCanceled = useSelector(selectAuthCanceled);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    !user && dispatch(openSignIn());
  }, [dispatch]);

  useEffect(() => {
    if (authCanceled && !user) {
      navigate(redirectTo);
      dispatch(closeAuthCanceled());
    }
  }, [authCanceled, navigate, redirectTo, user]);

  if (!user) {
    return null;
  }

  return <Component />;
};

export default PrivateRoute;
