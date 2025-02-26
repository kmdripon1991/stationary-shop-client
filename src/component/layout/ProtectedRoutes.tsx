import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hook";
import { Navigate, useLocation } from "react-router-dom";
import { useCurrentToken } from "../../redux/features/auth/authSlice";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(useCurrentToken);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace={true} />;
  }

  return children;
};

export default ProtectedRoutes;
