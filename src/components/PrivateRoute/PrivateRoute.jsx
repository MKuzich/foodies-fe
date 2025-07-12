import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "redux/useAuth";

export const PrivateRoute = ({ redirectTo = "/" }) => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to={redirectTo} replace />;
};
