import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { openSignIn } from "../../redux/auth/slice";

const PrivateRoute = ({ component: Component, redirectTo = "/" }) => {
  const { user } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    !user && dispatch(openSignIn());
  }, [dispatch]);

  return user ? <Component /> : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
