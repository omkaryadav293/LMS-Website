import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Fragment } from "react";

function RouteGuard({ authenticated, user, element }) {
  const location = useLocation();
  const navtigate = useNavigate();

  if (!authenticated && !location.pathname.includes("/login")) {
    return <Navigate to="/login" />;
  }

  if (
    authenticated &&
    user?.role !== "instructor" &&
    (location.pathname.includes("instructor") ||
      location.pathname.includes("/login"))
  ) {
    return <Navigate to="/" />;
  }

  
  if (
    authenticated &&
    user.role === "instructor" &&
    !location.pathname.startsWith("/instructor")
  ) {
    return <Navigate to="/instructor" />;
  }
  
  return <Fragment>{element}</Fragment>;
}

export default RouteGuard;