import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";

const PrivateRoute = () => {
  const { users, currentUser } = useAuth();
  if (users.length === 0) return <Navigate to="/register" />;
  if (!currentUser) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;