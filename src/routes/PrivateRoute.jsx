// components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useSelector((state) => state.token);
  return isAuthenticated ? element : <Navigate to="/" replace/>;
};

export default PrivateRoute;
