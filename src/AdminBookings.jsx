import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "./api";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get("/api/bookings").then(res => setBookings(res.data));
  }, []);

  return (
    <div className="container">
      <h2>Admin – Bookings</h2>

      <div style={{ marginBottom: 20 }}>
        <Link to="/admin/celebs">⭐ Manage Celebrities</Link>
      </div>

      {bookings.length === 0 && <p>No bookings yet</p>}

      {bookings.map(b => (
        <div className="card" key={b._id}>
          <p><b>{b.celebrity}</b></p>
          <p>{b.name} — {b.email}</p>
          {b.message && <p>{b.message}</p>}
          <p style={{ fontSize: 12 }}>{new Date(b.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default AdminBookings;
