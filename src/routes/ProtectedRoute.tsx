import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const token = useAppSelector((state) => state.auth.token);
  return token ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
