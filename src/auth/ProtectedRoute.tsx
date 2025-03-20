import { FC, ReactNode } from "react";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
  authToken: string | null;
  children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = (props) => {
  if (!props.authToken) {
    return <Navigate to="/login" replace />;
  }

  return <>{props.children}</>;
};
