import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import AdminCelebs from "./AdminCelebs";
import AdminBookings from "./AdminBookings";

const isLoggedIn = () => !!localStorage.getItem("token");

const Private = ({ children }) =>
  isLoggedIn() ? children : <Navigate to="/admin/login" />;

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/celebs" element={<Private><AdminCelebs /></Private>} />
      <Route path="/admin/bookings" element={<Private><AdminBookings /></Private>} />
    </Routes>
  );
}
