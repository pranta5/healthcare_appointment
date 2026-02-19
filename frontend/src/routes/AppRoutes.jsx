import { Routes, Route } from "react-router";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import PatientDashboard from "../pages/PatientDashboard";
import DoctorDashboard from "../pages/DoctorDashboard";
import AdminDashborad from "../pages/AdminDashborad";
import Home from "../pages/Home";
import DoctorDetails from "../pages/DoctorDetails";

const AppRoutes = () => {
  return (
    <Routes>
      {/* public routes*/}
      <Route path="/" element={<Home />} />
      <Route path="/doctor/:id" element={<DoctorDetails />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* patient */}
      <Route
        path="/patient"
        element={
          <ProtectedRoute>
            <RoleRoute role="patient">
              <PatientDashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />
      {/* doctor */}
      <Route
        path="/doctor"
        element={
          <ProtectedRoute>
            <RoleRoute role="doctor">
              <DoctorDashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />
      {/* admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <RoleRoute role="admin">
              <AdminDashborad />
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
