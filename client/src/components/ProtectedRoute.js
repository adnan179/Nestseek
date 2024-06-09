import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ component: Component, role, ...rest }) => {
  const { auth } = useContext(AuthContext);

  if (!auth.token || auth.role !== role) {
    return <Navigate to="/login" />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
