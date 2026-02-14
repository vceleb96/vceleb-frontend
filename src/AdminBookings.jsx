import { useEffect, useState } from "react";
import api from "./api";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/api/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading bookings...</p>;
  }

  return (
    <div>
      <h3>Bookings</h3>

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
    </div>
  );
}

export default AdminBookings;
