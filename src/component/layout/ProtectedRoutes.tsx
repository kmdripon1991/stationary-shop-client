import { ReactNode, useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hook";
import { Navigate, useLocation } from "react-router-dom";
import { useCurrentToken } from "../../redux/features/auth/authSlice";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const token = useAppSelector(useCurrentToken);

  const location = useLocation();

  useEffect(() => {
    if (token !== undefined) {
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/login" replace={true} state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoutes;
