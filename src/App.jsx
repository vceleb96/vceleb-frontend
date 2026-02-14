import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import AdminLayout from "./AdminLayout";
import AdminCelebs from "./AdminCelebs";
import AdminBookings from "./AdminBookings";
import AdminDashboard from "./AdminDashboard";
import AdminChangePassword from "./AdminChangePassword";
import PrivateRoute from "./PrivateRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<Login />} />

      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="celebs" element={<AdminCelebs />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="change-password" element={<AdminChangePassword />} />
      </Route>
    </Routes>
  );
}
