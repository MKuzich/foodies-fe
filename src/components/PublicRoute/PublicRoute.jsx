import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "redux/useAuth";

export const PublicRoute = ({ restricted, redirectTo = "/" }) => {
  const { user } = useAuth();
  const shouldRedirect = user && restricted;

  return shouldRedirect ? <Navigate to={redirectTo} replace /> : <Outlet />;
};
