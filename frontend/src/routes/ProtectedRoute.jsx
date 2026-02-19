import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ Children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <p>Loading</p>;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  return Children;
};

export default ProtectedRoute;
