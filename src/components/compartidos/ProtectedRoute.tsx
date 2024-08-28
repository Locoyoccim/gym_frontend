import { ComponentType } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./memoria/AuthProvider";

interface ProtectedRouteProps {
  Element: ComponentType<any>;
}

function ProtectedRoute({ Element }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  
  return !isAuthenticated ? <Navigate to={'/'} /> : <Element />
}

export default ProtectedRoute;
