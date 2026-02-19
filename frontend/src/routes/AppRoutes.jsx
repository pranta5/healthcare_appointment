import { Routes, Route } from "react-router";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import PatientDashboard from "../pages/PatientDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      {/* public routes*/}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* patient */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <RoleRoute role="patient">
              <PatientDashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />
      {/* 404 */}
      <Route path="*" element={<h2>404 not found</h2>} />
    </Routes>
  );
};

export default AppRoutes;
