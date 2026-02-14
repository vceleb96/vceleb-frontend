import { Link, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Admin Panel</h2>

      <nav style={{ marginBottom: 20 }}>
        <Link to="/admin/celebs">Celebrities</Link>{" | "}
        <Link to="/admin/bookings">Bookings</Link>{" | "}
        <button onClick={logout}>Logout</button>
      </nav>

      <Outlet />
    </div>
  );
}
