import { useSelector } from "react-redux";
import { selectLoggedInStatus } from "../redux/reducers/userSlice";
import { Navigate, Outlet } from "react-router-dom";

const RedirectIfAuthenticated = () => {
  const userDetails = useSelector(selectLoggedInStatus);
  return userDetails ? <Navigate to="/" replace /> : <Outlet></Outlet>;
};

export default RedirectIfAuthenticated;
