import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { selectLoggedInStatus } from "../redux/reducers/userSlice";

const RequireAuth = () => {
  const isLoggedIn = useSelector(selectLoggedInStatus);
  const location = useLocation();

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
