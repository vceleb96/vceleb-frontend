import { Link, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div style={{ padding: 16, maxWidth: 1200, margin: "auto" }}>
      <h2 style={{ marginBottom: 10 }}>Admin Panel</h2>

      {/* Responsive Nav */}
      <nav
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          marginBottom: 20
        }}
      >
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/celebs">Celebrities</Link>
        <Link to="/admin/bookings">Bookings</Link>
        <Link to="/admin/change-password">Change Password</Link>
        <button onClick={logout}>Logout</button>
      </nav>

      <Outlet />
    </div>
  );
}
