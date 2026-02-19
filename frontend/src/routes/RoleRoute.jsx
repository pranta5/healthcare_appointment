import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router";

const RoleRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) return null;

  if (user.role !== role) {
    return <Navigate to="/" />;
  }
  return children;
};

export default RoleRoute;
