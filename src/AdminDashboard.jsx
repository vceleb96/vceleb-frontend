import { useEffect, useState } from "react";
import api from "./api";

function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api
      .get("/api/dashboard", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => setStats(res.data));
  }, []);

  if (!stats) return <p>Loading dashboard...</p>;

  return (
    <div>
      <h3>Dashboard</h3>

      <p>
        <strong>Total Celebrities:</strong> {stats.celebrities}
      </p>

      <p>
        <strong>Total Bookings:</strong> {stats.bookings}
      </p>
    </div>
  );
}

export default AdminDashboard;
