import React, { useContext } from "react";

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
// import { history } from '_helpers';

const PrivateRoute = ({ children, ...rest }) => {
  const location = useLocation();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return loggedInUser?.email ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
