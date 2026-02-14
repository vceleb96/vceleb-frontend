import { useEffect, useState } from "react";
import api from "./api";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const res = await api.get("/api/bookings");
    setBookings(res.data);
  };

  const updateStatus = async (id, status) => {
    await api.put(`/api/bookings/${id}/status`, { status });
    fetchBookings();
  };

  return (
    <div>
      <h3>Bookings</h3>

      {bookings.map(b => (
        <div
          key={b._id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10
          }}
        >
          <p><strong>Name:</strong> {b.name}</p>
          <p><strong>Email:</strong> {b.email}</p>
          <p><strong>Celebrity:</strong> {b.celebrity}</p>
          <p><strong>Message:</strong> {b.message}</p>
          <p><strong>Status:</strong> {b.status}</p>

          <select
            value={b.status}
            onChange={e =>
              updateStatus(b._id, e.target.value)
            }
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      ))}
    </div>
  );
}

export default AdminBookings;
