import { useEffect, useState } from "react";
import api from "./api";
import AdminLayout from "./AdminLayout";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  // 🔐 Protect route
  if (!localStorage.getItem("token")) {
    window.location.href = "/admin/login";
    return null;
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const res = await api.get("/api/bookings");
    setBookings(res.data);
  };

  return (
    <AdminLayout>
      <h2>Bookings</h2>

      {bookings.length === 0 && <p>No bookings yet</p>}

      {bookings.map(b => (
        <div
          key={b._id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10
          }}
        >
          <p>
            <strong>Name:</strong> {b.name}
          </p>
          <p>
            <strong>Email:</strong> {b.email}
          </p>
          <p>
            <strong>Celebrity:</strong> {b.celebrity}
          </p>
          <p>
            <strong>Message:</strong> {b.message}
          </p>
        </div>
      ))}
    </AdminLayout>
  );
}

export default AdminBookings;
