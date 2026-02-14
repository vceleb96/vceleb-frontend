import { Link, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 30 }}>
      <h2>Admin Panel</h2>

      <nav>
        <Link to="/admin/dashboard">Dashboard</Link>{" | "}
        <Link to="/admin/celebs">Celebrities</Link>{" | "}
        <Link to="/admin/bookings">Bookings</Link>{" | "}
        <Link to="/admin/change-password">Change Password</Link>{" | "}
        <button onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}>Logout</button>
      </nav>

      <hr />
      <Outlet />
    </div>
  );
}
