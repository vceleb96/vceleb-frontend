import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import AdminCelebs from "./AdminCelebs";
import AdminBookings from "./AdminBookings";
import AdminLayout from "./AdminLayout";
import PrivateRoute from "./PrivateRoute";

export default function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<Login />} />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="celebs" replace />} />
        <Route path="celebs" element={<AdminCelebs />} />
        <Route path="bookings" element={<AdminBookings />} />
      </Route>
    </Routes>
  );
}
